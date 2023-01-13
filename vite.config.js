import basicSsl from '@vitejs/plugin-basic-ssl'

import path from 'path';
import vue from '@vitejs/plugin-vue2'

export default {
  plugins: [
    vue(),
    basicSsl()
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