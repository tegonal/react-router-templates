import { unstable_createI18nextMiddleware } from 'remix-i18next/middleware'

import { i18nConfig } from '~/i18n-config.ts'
import { i18nCookie } from '~/lib/cookies/i18next-cookie.server.ts'

export const [i18nextMiddleware, getLocale, getInstance] = unstable_createI18nextMiddleware({
	detection: {
		cookie: i18nCookie,
		fallbackLanguage: i18nConfig.fallbackLng,
		async findLocale(request) {
			const firstPathSegment =
				new URL(request.url).pathname.split('/').at(1) || i18nConfig.fallbackLng
			if (i18nConfig.supportedLngs.includes(firstPathSegment)) {
				return firstPathSegment
			}
			return null
		},
		order: ['custom', 'cookie', 'header'],
		supportedLanguages: i18nConfig.supportedLngs,
	},
	i18next: {
		defaultNS: i18nConfig.defaultNS,
		resources: i18nConfig.resources,
	},
})
