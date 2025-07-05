module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
    "stylelint-prettier/recommended"
  ],
  plugins: [
    "stylelint-order"
  ],
  rules: {
    "selector-class-pattern": null,
    "no-descending-specificity": null,
  },
  ignoreFiles: ["node_modules/**", "dist/**", "source/**"]
};
