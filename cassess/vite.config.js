import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('vite').UserConfig} */
export default {
  root: './',
  base: '/pandelearnamonium/cassess/',
  build: {
    rollupOptions: {
      input: globSync('**/*.html').map((path) => {
        return resolve(__dirname, path);
      }),
    },
  },
};
