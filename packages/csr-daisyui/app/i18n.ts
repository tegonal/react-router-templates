import i18n, { type InitOptions } from 'i18next'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

export const i18nConfig: InitOptions = {
	backend: {
		loadPath: '/locales/{{ns}}.{{lng}}.json',
	},
	defaultNS: 'common',
	supportedLngs: ['en', 'de'],
	preload: ['en', 'de'],
	fallbackLng: 'en',
	lng: 'en',
	interpolation: {
		escapeValue: false,
	},
}

void i18n.use(HttpBackend).use(initReactI18next).init(i18nConfig)

export default i18n
