import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // Required for local file/PWA compatibility
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        draw: resolve(__dirname, 'draw.html')
      }
    }
  }
});