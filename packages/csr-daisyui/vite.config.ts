import * as path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import vitePluginSvgr from 'vite-plugin-svgr'

export default defineConfig(() => {
  return {
    build: {
      // Vite 8 uses Rolldown. Split vendor code into stable, cacheable chunks.
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'react',
                priority: 20,
                test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/,
              },
              {
                minSize: 10_000,
                name: 'vendor',
                priority: 5,
                test: /node_modules[\\/]/,
              },
            ],
          },
        },
      },
      sourcemap: true,
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
