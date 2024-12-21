import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'ethers': 'ethers/lib/ethers.js'
    }
  },
  optimizeDeps: {
    include: ['ethers']
  }
});
