import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [topLevelAwait(),vue()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
})
