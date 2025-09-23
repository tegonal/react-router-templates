import { type Config } from '@react-router/dev/config'

// RR7 Middleware is now stable in v7.9.0+

declare module 'react-router' {
	interface Future {
		v8_middleware: true
	}
}

export default {
	future: {
		unstable_optimizeDeps: true,
		v8_middleware: true,
	},
	ssr: true,
} satisfies Config
