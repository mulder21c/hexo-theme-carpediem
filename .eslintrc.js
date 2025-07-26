module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.scripts.json"],
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "jsx-a11y",
    "prettier",
    "stylelint",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ["./tsconfig.json", "./tsconfig.scripts.json"],
      },
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "info", "debug"]
      },
    ],
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "source",
    "*.js",
    "!.eslintrc.js",
  ],
};
