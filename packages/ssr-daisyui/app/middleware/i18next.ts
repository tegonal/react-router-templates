import { createI18nextMiddleware } from 'remix-i18next/middleware'

import { i18nConfig } from '~/i18n-config.ts'
import { i18nCookie } from '~/lib/cookies/i18next-cookie.server.ts'

const ignorePaths = ['/api/*']

export const [i18nextMiddleware, getLocale, getInstance] = createI18nextMiddleware({
  detection: {
    cookie: i18nCookie,
    fallbackLanguage: i18nConfig.fallbackLng,
    // Only handle path-based detection here. Returning null lets remix-i18next
    // fall through its built-in chain (searchParams → cookie → session → header),
    // which parses Accept-Language natively via its own parser — no external
    // dependency needed.
    async findLocale(request) {
      const pathname = new URL(request.url).pathname
      if (ignorePaths.some((path) => pathname.match(path))) {
        return null
      }

      const firstPathSegment = pathname.split('/').at(1) || ''
      if (i18nConfig.supportedLngs.includes(firstPathSegment)) {
        return firstPathSegment
      }

      return null
    },
    supportedLanguages: i18nConfig.supportedLngs,
  },
  i18next: {
    defaultNS: i18nConfig.defaultNS,
    fallbackNS: i18nConfig.fallbackNS,
    ns: i18nConfig.ns,
    resources: i18nConfig.resources,
    returnEmptyString: i18nConfig.returnEmptyString,
  },
})
