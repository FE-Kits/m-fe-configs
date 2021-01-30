import path from 'path';

import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import createImportPlugin from 'vite-plugin-import';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default basePath =>
  defineConfig({
    alias: {
      '@/': path.resolve(basePath, './src'),
    },
    plugins: [
      reactRefresh(),
      legacy({
        targets: ['defaults', 'not ie <= 10'],
      }),
      createImportPlugin([
        {
          libraryName: 'antd',
          style: true, // or 'css'
        },
        {
          libraryName: 'antd-mobile',
          style: true, // or 'css'
        },
      ]),
      VitePWA(),
      tsconfigPaths(),
    ],
  });
