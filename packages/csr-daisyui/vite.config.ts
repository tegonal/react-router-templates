import * as path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePluginSvgr from 'vite-plugin-svgr'

export default defineConfig(() => {
	return {
		build: {
			sourcemap: true,
			rollupOptions: {
				output: {
					experimentalMinChunkSize: 20000,
					manualChunks: {
						react: ['react', 'react-dom', 'react-router'],
						vendor: [
							'lodash-es',
							'lucide-react',
							'@uidotdev/usehooks',
							'react-hook-form',
							'react-i18next',
							'date-fns',
							'zod',
						],
					},
				},
			},
		},
		plugins: [
			tailwindcss(),
			react(),
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
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './app'),
			},
		},
	}
})
