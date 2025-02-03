import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    cors: { origin: 'https://frontend-take-home-service.fetch.com'},
  },
  base: "/fetch-a-friend/",
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        '404': resolve(__dirname, 'public/404.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
