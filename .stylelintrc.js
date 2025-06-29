module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-recess-order'
  ],
  plugins: [
    'stylelint-order'
  ],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null
  },
  ignoreFiles: ['node_modules/**', 'dist/**', 'source/**']
};
