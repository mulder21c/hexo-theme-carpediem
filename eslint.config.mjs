// @ts-check
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig(
  // ESLint Recommended Rules
  eslint.configs.recommended,
  // TypeScript ESLint Recommended Rules
  ...tseslint.configs.recommended,
  // JSX a11y Recommended Rules
  jsxA11y.flatConfigs.recommended,
  // Additional settings for JSX files
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
    plugins: {
      prettier: prettier,
    },
    rules: {
      // Prettier integration
      "prettier/prettier": "error",
    },
  },
  // CommonJS JavaScript files in scripts directory
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: {
        ...globals.node,
        hexo: "readonly",
      },
    },
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      // CommonJS specific rules
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-undef": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  // Disable ESLint rules that conflict with Prettier
  eslintConfigPrettier,
);
