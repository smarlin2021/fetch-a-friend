import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    cors: { origin: 'https://frontend-take-home-service.fetch.com'},
  },
  base: "/fetch-a-friend/",
  build: {
    outDir: 'dist',
    manifest: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
