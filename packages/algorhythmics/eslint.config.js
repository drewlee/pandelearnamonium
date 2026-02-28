import { defineConfig } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsdoc from 'eslint-plugin-tsdoc';

const { browser, node, nodeBuiltin, vitest } = globals;
const JS_FILES = Object.freeze(['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}']);
const TS_FILES = Object.freeze(['**/*.{ts,tsx,mts,cts}']);

// console.log(node);

export default defineConfig([
  // Global settings
  {
    languageOptions: {
      globals: {
        ...browser,
        ...node,
        ...nodeBuiltin,
        ...vitest,
      },
    },
  },

  {
    files: JS_FILES,
    rules: {
      // ESLint recommended rules
      ...pluginJs.configs.recommended.rules,
      // Prettier overrides
      ...eslintConfigPrettier.rules,
    },
  },

  {
    // App specific overrides
    files: ['freecodecamp-problems/*.{js,ts}'],
    rules: {
      'no-unused-vars': 'off',
    },
  },

  // TypeScript ESLint recommended type checks
  {
    files: TS_FILES,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [tseslint.configs.recommendedTypeChecked, tseslint.configs.stylisticTypeChecked],
  },

  // TSDoc plugin
  {
    files: TS_FILES,
    plugins: { tsdoc },
    rules: {
      'tsdoc/syntax': 'error',
    },
  },
]);
