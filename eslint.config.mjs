// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // ESLint 추천 규칙
  eslint.configs.recommended,
  // TypeScript ESLint 추천 규칙
  ...tseslint.configs.recommended,
  // JSX a11y 추천 규칙 (Flat Config 형식)
  ...jsxA11y.flatConfigs.recommended,
  // JSX 파일에 대한 추가 설정
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
    plugins: {
      prettier: prettier,
    },
    rules: {
      // Prettier 통합
      'prettier/prettier': 'error',
    },
  },
  // Prettier와 충돌하는 ESLint 규칙 비활성화
  eslintConfigPrettier,
);
