import { defineConfig } from 'i18next-cli'

export default defineConfig({
  extract: {
    contextSeparator: '_',
    defaultNS: 'common',
    defaultValue: (key, _namespace, language, value) => {
      // EN gets the default value from code; other locales keep empty
      if (language === 'en' && value) return value
      return ''
    },
    extractFromComments: false,
    input: ['app/**/*.{ts,tsx}'],
    keySeparator: '.',
    nsSeparator: ':',
    // Flat filenames match the http-backend loadPath in app/i18n.ts
    output: 'public/locales/{{namespace}}.{{language}}.json',
    pluralSeparator: '_',
    removeUnusedKeys: true,
    warnOnConflicts: true,
  },
  lint: {
    ignore: [],
    ignoredTags: ['noscript'],
  },
  locales: ['en', 'de'],
  types: {
    input: ['public/locales/common.en.json'],
    output: 'app/types/i18next.d.ts',
    resourcesFile: 'app/types/resources.d.ts',
  },
})
