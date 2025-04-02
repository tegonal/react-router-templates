import { config as defaultConfig } from '@epic-web/config/eslint'
import react from 'eslint-plugin-react'

/** @type {import("eslint").Linter.Config[]} */
export default [
	...defaultConfig,
	{
		plugins: {
			react: react,
		},
		rules: {
			'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
		},
	},
]
