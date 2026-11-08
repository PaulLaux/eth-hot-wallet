import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const app = path.resolve('app');

export default defineConfig({
  root: app,
  base: './',
  // eth-lightwallet, web3 0.20 and ethereumjs-tx expect Node's Buffer, crypto and stream
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: [
      { find: /^(components|containers|utils|vendor)\//, replacement: `${app}/$1/` },
      // antd 3 imports all icons as a namespace; the CommonJS build adds a `default` entry it can't register
      { find: '@ant-design/icons/lib/dist', replacement: '@ant-design/icons/lib/index.es.js' },
    ],
  },
  // Optional RPC overrides, see app/containers/Header/network.js
  define: {
    'process.env.MAINNET_RPC_URL': JSON.stringify(process.env.MAINNET_RPC_URL || ''),
    'process.env.SEPOLIA_RPC_URL': JSON.stringify(process.env.SEPOLIA_RPC_URL || ''),
  },
  server: { port: 3001, strictPort: true },
  preview: { port: 3001, strictPort: true },
  build: { outDir: '../build', emptyOutDir: true },
  test: { globals: true },
});
