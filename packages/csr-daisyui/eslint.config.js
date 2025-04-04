import { config as defaultConfig } from '@epic-web/config/eslint'
import { globalIgnores } from 'eslint/config'

/** @type {import("eslint").Linter.Config[]} */
export default [
	globalIgnores(['./dist/**/*']),
	...defaultConfig,
	{
		files: ['./app/**/*.tsx', './app/**/*.jsx'],
		plugins: {
			react2: (await import('eslint-plugin-react')).default,
		},
		rules: {
			'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
		},
	},
]
