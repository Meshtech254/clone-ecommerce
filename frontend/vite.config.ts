import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { configDefaults } from 'vitest/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: "Clo'ne",
        short_name: "Clo'ne",
        description: 'Luxury fashion storefront',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/vite.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: '/vite.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' }
        ]
      }
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    exclude: [...configDefaults.exclude],
  },
  resolve: {
    alias: {
      './src/assets/clonelogo.png.jpg': path.resolve(__dirname, 'src/__mocks__/clonelogo.png.jpg'),
    },
  },
})
