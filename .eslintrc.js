module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
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
    project: "./tsconfig.json",
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
      },
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "react/react-in-jsx-scope": "off", // React 17부터는 import React 선언이 필요 없음
    "react/prop-types": "off", // TypeScript를 사용하므로 prop-types는 필요 없음
    "react/require-default-props": "off", // TypeScript의 optional props와 충돌할 수 있음
    "import/prefer-default-export": "off", // 단일 export에 대한 제한 완화
    "react/jsx-props-no-spreading": "off", // props spreading 허용
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "info"]
      },
    ],
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "source", // 빌드 결과물 제외
    "*.js", // 프로젝트 루트의 JS 설정 파일들은 제외
    "!.eslintrc.js", // eslintrc.js는 린팅 대상에 포함
  ],
};
