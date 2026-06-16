import vitest from '@vitest/eslint-plugin'
import checkFile from 'eslint-plugin-check-file'
import importX from 'eslint-plugin-import-x'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unicorn from 'eslint-plugin-unicorn'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const vitestFiles = ['**/__tests__/**/*', '**/*.test.*', '**/*.spec.*']
const testFiles = ['**/tests/**', '**/#tests/**', ...vitestFiles]

/** @type {import("eslint").Linter.Config[]} */
export default [
  globalIgnores([
    '**/.cache/**',
    '**/node_modules/**',
    '**/build/**',
    '**/public/**',
    '**/*.json',
    '**/dist/**',
    '**/coverage/**',
    '**/*.tsbuildinfo',
    '**/*.d.ts',
    '**/.react-router/**',
    '.react-router/',
  ]),

  // All files — core rules + import plugin
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importX,
    },
    rules: {
      'import/no-duplicates': ['warn', { 'prefer-inline': true }],
      'import/order': 'off',
      'no-unexpected-multiline': 'error',
      'no-warning-comments': ['error', { location: 'anywhere', terms: ['FIXME'] }],
    },
  },

  // JSX/TSX files — React plugin
  {
    files: ['**/*.tsx', '**/*.jsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        jsx: true,
      },
    },
    plugins: {
      react,
    },
    rules: {
      'react/jsx-key': 'warn',
    },
  },

  // All JS/TS/JSX/TSX — React hooks
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
  },

  // JS and JSX files
  {
    files: ['**/*.js?(x)'],
    rules: {
      'no-undef': 'error',
      'no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^(_|ignored)',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^(_|ignored)',
        },
      ],
    },
  },

  // TS and TSX files — TypeScript parser + rules
  {
    files: ['**/*.ts?(x)'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^(_|ignored)',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^(_|ignored)',
        },
      ],
      'import/consistent-type-specifier-style': ['warn', 'prefer-inline'],
    },
  },

  // Prevent importing test files in source files
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    ignores: testFiles,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: testFiles,
              message: 'Do not import test files in source files',
            },
          ],
        },
      ],
    },
  },

  // Vitest rules for test files
  {
    files: testFiles,
    plugins: {
      vitest,
    },
    rules: {
      'vitest/no-focused-tests': ['warn', { fixable: false }],
      'vitest/no-import-node-test': 'error',
      'vitest/prefer-comparison-matcher': 'error',
      'vitest/prefer-equality-matcher': 'error',
      'vitest/prefer-to-be': 'error',
      'vitest/prefer-to-contain': 'error',
      'vitest/prefer-to-have-length': 'error',
      'vitest/valid-expect': 'error',
      'vitest/valid-expect-in-promise': 'error',
    },
  },

  // Project-specific TypeScript rules
  {
    files: ['./app/**/*.ts', './app/**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
      ],
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    },
  },

  // JSX curly brace presence
  {
    files: ['./app/**/*.tsx', './app/**/*.jsx'],
    rules: {
      'react/jsx-curly-brace-presence': ['error', { children: 'never', props: 'never' }],
    },
  },

  // Unicorn
  unicorn.configs.recommended,
  {
    rules: {
      // React closures need inner functions — too many false positives
      'unicorn/consistent-function-scoping': 'off',
      // Too opinionated — disable
      'unicorn/filename-case': 'off',
      // Opinionated import style preferences
      'unicorn/import-style': 'off',
      // Named callbacks are clearer than inline arrows
      'unicorn/no-array-callback-reference': 'off',
      // Legitimate pattern in reducers and aggregations
      'unicorn/no-array-reduce': 'off',
      // Migrate gradually — warn only
      'unicorn/no-array-sort': 'warn',
      // Auto-fix breaks HTMLCollection/NodeList iteration
      'unicorn/no-for-loop': 'off',
      // Immediate mutation is fine for builder patterns
      'unicorn/no-immediate-mutation': 'off',
      // Conflicts with other tooling or project conventions
      'unicorn/no-nested-ternary': 'off',
      'unicorn/no-null': 'off',
      // Auto-fix removes required undefined args in function calls
      'unicorn/no-useless-undefined': 'off',
      // WebSocket API uses on* handlers by design
      'unicorn/prefer-add-event-listener': 'off',
      // Auto-fix rewrites window.X to globalThis.X, breaking TS declarations
      'unicorn/prefer-global-this': 'off',
      // Multiple push calls are often clearer than spread/concat
      'unicorn/prefer-single-call': 'off',
      // Auto-fix can break HTMLCollection usage
      'unicorn/prefer-spread': 'off',
      // Ternary is not always more readable than if/else
      'unicorn/prefer-ternary': 'off',
      // Entry file uses IIFE pattern
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },

  // Perfectionist
  perfectionist.configs['recommended-natural'],

  // Filename conventions
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    ignores: [
      // React Router special files
      '**/routes/_*.tsx',
      '**/routes/$.tsx',
    ],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{js,ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },
]
