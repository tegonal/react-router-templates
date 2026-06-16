import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePluginSvgr from 'vite-plugin-svgr'

export default defineConfig(() => ({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [
    reactRouter(),
    tailwindcss(),
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
    tsconfigPaths: true,
  },
  server: {
    host: true,
  },
}))
