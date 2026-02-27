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

const TS_FILES = Object.freeze(['**/*.{ts,tsx,mts,cts}']);

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  // Global settings
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },

  // ESLint recommended config
  pluginJs.configs.recommended,

  // Prettier config
  eslintConfigPrettier,

  // HTML ESLint config
  {
    files: ['**/*.html'],
    extends: [html.configs['flat/recommended']],
    rules: {
      // Misc rules
      '@html-eslint/indent': ['error', 2],
      '@html-eslint/require-meta-charset': 'error',
      // Disables conflicts with Prettier
      '@html-eslint/attrs-newline': 'off',
      '@html-eslint/no-extra-spacing-attrs': 'off',
      '@html-eslint/require-closing-tags': ['error', { selfClosing: 'always' }],
      // Enables a11y rules
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

  // JSX configs
  {
    files: ['**/*.{jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      reactPlugin.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    rules: {
      // Handled via Vite config
      'react/react-in-jsx-scope': 'off',
    },
  },

  // TypeScript config
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

  // TSDoc plugin config
  {
    files: TS_FILES,
    plugins: { tsdoc },
    rules: {
      'tsdoc/syntax': 'error',
    },
  },

  globalIgnores(['dist']),
]);
