import { config as defaultConfig } from '@epic-web/config/eslint'

/** @type {import("eslint").Linter.Config[]} */
export default [
	// globalIgnores(['.react-router/']),
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
