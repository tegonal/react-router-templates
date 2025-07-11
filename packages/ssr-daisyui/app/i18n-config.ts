import de from '~/locales/de.ts'
import en from '~/locales/en.ts'

export const i18nConfig = {
	// The default namespace of i18next is "translation", but you can customize it here
	defaultNS: 'common',
	// This is the language you want to use in case
	// if the user language is not in the supportedLngs
	fallbackLng: 'en',
	resources: {
		de,
		en,
	},
	// This is the list of languages your application supports
	supportedLngs: ['en', 'de'],
}
