import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import html from '@html-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';
import tsdoc from 'eslint-plugin-tsdoc';
import reactPlugin from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import * as reactHooks from 'eslint-plugin-react-hooks';

const { browser, vitest } = globals;
const JS_FILES = Object.freeze(['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}']);
const TS_FILES = Object.freeze(['**/*.{ts,tsx,mts,cts}']);

export default defineConfig([
  // Global settings
  {
    languageOptions: {
      globals: {
        ...browser,
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

  // HTML ESLint plugin
  {
    files: ['**/*.html'],
    plugins: {
      html,
    },
    extends: ['html/flat/recommended'],
    language: 'html/html',
    rules: {
      // Misc rules
      '@html-eslint/indent': ['error', 2],
      '@html-eslint/require-meta-charset': 'error',
      // Disable conflicts with Prettier
      '@html-eslint/attrs-newline': 'off',
      '@html-eslint/no-extra-spacing-attrs': 'off',
      '@html-eslint/require-closing-tags': ['error', { selfClosing: 'always' }],
      // Enable a11y rules
      '@html-eslint/no-abstract-roles': 'error',
      '@html-eslint/no-accesskey-attrs': 'error',
      '@html-eslint/no-aria-hidden-body': 'error',
      '@html-eslint/no-heading-inside-button': 'error',
      '@html-eslint/no-invalid-role': 'error',
      '@html-eslint/no-nested-interactive': 'error',
      '@html-eslint/no-non-scalable-viewport': 'error',
      '@html-eslint/no-positive-tabindex': 'error',
      '@html-eslint/no-skip-heading-levels': 'error',
      '@html-eslint/require-button-type': 'error',
      '@html-eslint/require-form-method': 'error',
      '@html-eslint/require-frame-title': 'error',
      '@html-eslint/require-input-label': 'error',
      '@html-eslint/require-meta-viewport': 'error',
    },
  },

  // JSX related plugins
  {
    files: ['**/*.{jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    rules: {
      // Handled via Vite config
      'react/react-in-jsx-scope': 'off',
    },
  },

  // TypeScript plugin
  {
    files: TS_FILES,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [tseslint.configs.recommendedTypeChecked, tseslint.configs.stylisticTypeChecked],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // TSDoc plugin
  {
    files: TS_FILES,
    plugins: { tsdoc },
    rules: {
      'tsdoc/syntax': 'error',
    },
  },

  globalIgnores(['dist']),
]);
