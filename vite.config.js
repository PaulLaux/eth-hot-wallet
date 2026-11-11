import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Network from './app/containers/Header/network.js';
import { coinGeckoPriceApi } from './app/utils/constants.js';

const app = path.resolve('app');

// Content Security Policy of the production build: code only from the app, network access only to
// the RPC nodes (with any MAINNET_RPC_URL / SEPOLIA_RPC_URL override) and CoinGecko.
// The dev server goes without: the policy would block its React Refresh script and live-reload socket.
const servers = new Set([...Object.values(Network).map((n) => n.rpc), coinGeckoPriceApi]
  .filter((url) => url.startsWith('http'))
  .map((url) => new URL(url).origin));
const csp = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'", // antd and styled-components inject <style> tags
  "img-src 'self' data:", // Vite inlines small images
  `connect-src 'self' ${[...servers].join(' ')}`,
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join('; ');
const cspPlugin = {
  name: 'csp',
  apply: 'build',
  transformIndexHtml: () => [
    { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: csp }, injectTo: 'head-prepend' },
  ],
};

export default defineConfig({
  root: app,
  base: './',
  plugins: [react(), cspPlugin],
  resolve: {
    alias: [{ find: /^(components|containers|utils)\//, replacement: `${app}/$1/` }],
  },
  // Optional RPC overrides, see app/containers/Header/network.js
  define: Object.fromEntries(['MAINNET', 'SEPOLIA', 'BASE', 'ARBITRUM', 'OPTIMISM'].map((n) => `${n}_RPC_URL`)
    .map((v) => [`process.env.${v}`, JSON.stringify(process.env[v] || '')])),
  server: { port: 3001, strictPort: true },
  preview: { port: 3001, strictPort: true },
  build: { outDir: '../build', emptyOutDir: true },
  test: { globals: true },
});
