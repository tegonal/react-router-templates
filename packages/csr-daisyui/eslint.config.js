import { config as defaultConfig } from '@epic-web/config/eslint'
import perfectionist from 'eslint-plugin-perfectionist'
import { globalIgnores } from 'eslint/config'

/** @type {import("eslint").Linter.Config[]} */
export default [
	globalIgnores(['./dist/**/*']),
	...defaultConfig,
	{
		rules: {
			'import/order': 'off',
		},
	},
	{
		files: ['./app/**/*.tsx', './app/**/*.jsx'],
		rules: {
			'react/jsx-curly-brace-presence': ['error', { children: 'never', props: 'never' }],
		},
	},
	perfectionist.configs['recommended-natural'],
]
