import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
