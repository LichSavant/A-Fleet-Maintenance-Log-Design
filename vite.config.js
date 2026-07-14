import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/dist/**', '**/qa-screenshots/**', '**/tmp-edge-profile/**'],
    },
  },
});
