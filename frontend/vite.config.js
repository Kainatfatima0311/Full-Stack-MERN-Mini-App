import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Assignment 3 spec: frontend on port 3000, backend on port 5000
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
});
