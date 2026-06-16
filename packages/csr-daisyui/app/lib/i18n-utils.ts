/**
 * Translation function type for dynamic keys.
 * Matches the signature of react-i18next's t() function, but accepts a plain
 * string key — use it for keys that are only known at runtime (form errors,
 * navigation config) where the strongly-typed t() would reject a `string`.
 */
export type TranslationFn = (key: string, defaultValue: string) => string

/**
 * Default translation function that returns the default value.
 * Use this where react-i18next is not available (e.g. building schemas).
 */
export const defaultT: TranslationFn = (_key, defaultValue) => defaultValue
