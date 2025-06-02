import defaultConfig from '@epic-web/config/prettier'

/** @type {import("prettier").Options} */
export default {
  ...defaultConfig,
  bracketSameLine: true,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  semi: false,
  singleQuote: true,
  tailwindFunctions: ['clsx', 'cva', 'cn'],
  trailingComma: 'all',
}
