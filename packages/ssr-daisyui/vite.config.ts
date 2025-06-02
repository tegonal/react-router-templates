import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePluginSvgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => ({
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		target: 'ES2022',
	},
	optimizeDeps: {
		esbuildOptions: {
			target: 'ES2022',
		},
	},
	plugins: [
		reactRouter(),
		tailwindcss(),
		tsconfigPaths(),
		ViteImageOptimizer(),
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
}))
