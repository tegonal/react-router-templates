import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePluginSvgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => ({
	plugins: [
		reactRouter(),
		tailwindcss(),
		tsconfigPaths(),
		ViteImageOptimizer({
			include: ['app/**/*.{svg, png, jpg, jpeg, gif}'],
		}),
		vitePluginSvgr({
			svgrOptions: {
				plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
				svgoConfig: {
					floatPrecision: 3,
				},
			},
		}),
	],
	server: {
		host: true,
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'ES2022',
		},
	},
	build: {
		target: 'ES2022',
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
}))
