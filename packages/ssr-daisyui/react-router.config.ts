import  { type Config } from '@react-router/dev/config'

// RR7 Middleware is currently unstable, but it is essential for SSR, so we are living on the edge.

declare module 'react-router' {
	interface Future {
		unstable_middleware: true
	}
}

export default {
	future: {
		unstable_middleware: true,
		unstable_optimizeDeps: true,
	},
	ssr: true,
} satisfies Config
