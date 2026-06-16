/**
 * Translation function type for dynamic keys.
 * Matches the signature of react-i18next's t() function, but accepts a plain
 * string key — use it for keys that are only known at runtime (form errors,
 * navigation config) where the strongly-typed t() would reject a `string`.
 */
export type TranslationFn = (key: string, defaultValue: string) => string

/**
 * Default translation function that returns the default value.
 * Use this in server-side actions where react-i18next is not available.
 *
 * @example
 * ```tsx
 * // Server-side action
 * const schema = createLoginSchema(defaultT)
 *
 * // Client-side component
 * const { t } = useTranslation()
 * const schema = createLoginSchema(t)
 * ```
 */
export const defaultT: TranslationFn = (_key, defaultValue) => defaultValue
