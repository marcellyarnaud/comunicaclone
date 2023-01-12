import basicSsl from '@vitejs/plugin-basic-ssl'

import path from 'path';
import { createVuePlugin } from 'vite-plugin-vue2';

module.exports = {
  plugins: [
    basicSsl(),
    createVuePlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '~bootstrap': 'bootstrap'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/variables";`
      }
    }
  }
}
