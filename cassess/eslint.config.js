import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import html from '@html-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Global settings
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  // ESLint recommended settings
  pluginJs.configs.recommended,

  // Prettier settings
  eslintConfigPrettier,

  // HTML ESLint settings
  {
    files: ['**/*.html'],
    ...Object.entries(html.configs['flat/recommended']).reduce((config, [key, values]) => {
      if (key === 'rules') {
        config[key] = {
          ...values,
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
        };
      } else {
        config[key] = values;
      }

      return config;
    }, {}),
  },
];
