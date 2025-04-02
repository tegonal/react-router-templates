import defaultConfig from '@epic-web/config/prettier'

/** @type {import("prettier").Options} */
export default {
  ...defaultConfig,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  bracketSameLine: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cva', 'cn'],
}
