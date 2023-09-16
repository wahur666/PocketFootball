import { defineConfig } from 'vite';
import preact from "@preact/preset-vite";

import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), checker({ typescript: true })],
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    assetsInlineLimit: 0,

  },
});
