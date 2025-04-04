import { type defaultNS, type resources } from './i18n-config.ts'

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS
		resources: typeof resources.en
	}
}
