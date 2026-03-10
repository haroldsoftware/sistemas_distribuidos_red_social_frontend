import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://red-social-service-389205780371.us-east1.run.app',
        changeOrigin: true,
      },
    },
  },
});
