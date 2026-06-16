import de from '~/locales/de.ts'
import en from '~/locales/en.ts'

import { LOCALES, NAMESPACES } from './i18n-constants.ts'

export {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
  LOCALES,
  type Namespace,
  NAMESPACES,
} from './i18n-constants.ts'

export const resources = { de, en }

export const defaultNS = 'common' as const

export const i18nConfig = {
  defaultNS,
  /** EN has all defaults from t() calls — use as fallback for untranslated keys */
  fallbackLng: 'en' as const,
  /**
   * Allow key lookup across all namespaces. Since all namespaces are eagerly
   * loaded, this lets utility functions and dynamic keys (form errors,
   * navigation config) resolve without knowing the source namespace.
   * Top-level keys are unique across namespaces, so collisions don't occur.
   */
  fallbackNS: [...NAMESPACES] as string[],
  ns: [...NAMESPACES] as string[],
  resources,
  /** Treat empty strings as missing translations — fall back to fallbackLng */
  returnEmptyString: false,
  supportedLngs: [...LOCALES] as string[],
}
