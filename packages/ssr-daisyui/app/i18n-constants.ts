/** Supported application locales */
export const LOCALES = ['en', 'de'] as const

/** Locale type derived from the LOCALES array */
export type Locale = (typeof LOCALES)[number]

/** Default locale for the application */
export const DEFAULT_LOCALE: Locale = 'en'

/** Type guard: checks if a string is a valid Locale */
export function isLocale(value: null | string | undefined): value is Locale {
  return !!value && (LOCALES as ReadonlyArray<string>).includes(value)
}

/** Translation namespaces */
export const NAMESPACES = ['common'] as const

/** Namespace type derived from the NAMESPACES array */
export type Namespace = (typeof NAMESPACES)[number]
