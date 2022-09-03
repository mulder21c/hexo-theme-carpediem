module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@babel/eslint-parser",
    sourceType: "module",
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["pug", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
