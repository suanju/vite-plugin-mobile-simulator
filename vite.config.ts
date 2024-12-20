import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'vite-plugin-mobile-simulator',
      fileName: 'vite-plugin-mobile-simulator',
    },
  },
})
