import { defineConfig } from 'vite';


import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [checker({ typescript: true })],
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    assetsInlineLimit: 0,

  },
});
