import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const app = path.resolve('app');

export default defineConfig({
  root: app,
  base: './',
  plugins: [react()],
  resolve: {
    alias: [{ find: /^(components|containers|utils)\//, replacement: `${app}/$1/` }],
  },
  define: {
    // Optional RPC overrides, see app/containers/Header/network.js
    'process.env.MAINNET_RPC_URL': JSON.stringify(process.env.MAINNET_RPC_URL || ''),
    'process.env.SEPOLIA_RPC_URL': JSON.stringify(process.env.SEPOLIA_RPC_URL || ''),
  },
  server: { port: 3001, strictPort: true },
  preview: { port: 3001, strictPort: true },
  build: { outDir: '../build', emptyOutDir: true },
  test: { globals: true },
});
