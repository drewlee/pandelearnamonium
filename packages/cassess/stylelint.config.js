/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // Allow for BEM style naming conventions
    'selector-class-pattern': ['^([a-z][a-z0-9]*)((-*|_*)[a-z0-9]+)*$'],
  },
  ignoreFiles: ['dist/**/*'],
};
