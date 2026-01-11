/** @type {import('stylelint').Config} */
export default {
  syntax: "scss",
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss",
    "stylelint-config-recess-order",
  ],
  plugins: ["stylelint-order"],
};
