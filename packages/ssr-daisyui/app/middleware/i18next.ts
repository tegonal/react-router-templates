import { unstable_createI18nextMiddleware } from 'remix-i18next/middleware'
import { i18nConfig } from '~/i18n-config.ts'
import { i18nCookie } from '~/lib/cookies/i18next-cookie.server.ts'

export const [i18nextMiddleware, getLocale, getInstance] = unstable_createI18nextMiddleware({
	detection: {
		supportedLanguages: i18nConfig.supportedLngs,
		fallbackLanguage: i18nConfig.fallbackLng,
		cookie: i18nCookie,
		order: ['custom', 'cookie', 'header'],
		async findLocale(request) {
			const firstPathSegment =
				new URL(request.url).pathname.split('/').at(1) || i18nConfig.fallbackLng
			if (i18nConfig.supportedLngs.includes(firstPathSegment)) {
				return firstPathSegment
			}
			return null
		},
	},
	i18next: {
		resources: i18nConfig.resources,
		defaultNS: i18nConfig.defaultNS,
	},
})
