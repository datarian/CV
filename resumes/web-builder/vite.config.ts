import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CV-pages/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 10000,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  define: {
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      'buffer': 'buffer/',
    }
  }
})
