import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';
export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'mobileSimulator',
      fileName: 'index',
    },
  },
  plugins: [dts()]
})
