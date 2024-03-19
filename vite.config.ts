import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// @ts-ignore
import pkg from './package.json';


// https://vitejs.dev/config/
export default defineConfig({
  base: `/${pkg.name}/`,
  build: {
    target: 'es2015'
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
