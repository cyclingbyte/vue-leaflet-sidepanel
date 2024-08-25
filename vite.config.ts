import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    dts({
      exclude: ['**/playground/**'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/lib.ts', import.meta.url)),
      formats: ['es', 'cjs', 'umd'],
      name: 'vue-leaflet-sidepanel',
      fileName: (format) => `vue-leaflet-sidepanel.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'leaflet', /^leaflet\/.*/, /^@vue-leaflet\/.*/],
      output: {
        // Global variables for use in the UMD build
        globals: {
          vue: 'Vue',
          leaflet: 'L',
          '@vue-leaflet/vue-leaflet': '@vue-leaflet/vue-leaflet',
        },
      },
    },
  },
});
