import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsdoc from 'eslint-plugin-tsdoc';

const { browser, node, nodeBuiltin, vitest } = globals;
const JS_FILES = Object.freeze(['**/*.{js,mjs,cjs,ts,tsx,mts,cts}']);
const TS_FILES = Object.freeze(['**/*.{ts,tsx,mts,cts}']);

/** @type {import('eslint').Linter.Config[]} */
const config = [
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

  // ESLint recommended settings
  {
    name: 'eslint/recommended',
    files: JS_FILES,
    ...pluginJs.configs.recommended,
  },

  // Prettier settings
  {
    name: 'eslint-config-prettier',
    files: JS_FILES,
    ...eslintConfigPrettier,
  },

  // TypeScript ESLint recommended type checks
  ...tseslint.configs.recommendedTypeChecked.map((config) => {
    if (config.languageOptions) {
      return {
        ...config,
        files: TS_FILES,
        languageOptions: {
          ...config.languageOptions,
          parserOptions: {
            ...config.languageOptions.parserOptions,
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
          },
        },
      };
    }

    return {
      ...config,
      files: TS_FILES,
    };
  }),

  // TypeScript ESLint stylistic type checks
  ...tseslint.configs.stylisticTypeChecked
    .filter(({ name }) => name === 'typescript-eslint/stylistic-type-checked')
    .map((config) => {
      return {
        ...config,
        files: TS_FILES,
      };
    }),

  // TSDoc plugin config
  {
    name: 'eslint-plugin-tsdoc',
    plugins: {
      tsdoc,
    },
    files: TS_FILES,
    rules: {
      'tsdoc/syntax': 'error',
    },
  },
];

export default config;
