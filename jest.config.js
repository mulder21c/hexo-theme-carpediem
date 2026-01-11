/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/components"],
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@source/(.*)$": "<rootDir>/source/$1",
    "^@layout/(.*)$": "<rootDir>/layout/$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          target: "ES2020",
          lib: ["ES2020", "DOM", "DOM.Iterable"],
          module: "ESNext",
          moduleResolution: "bundler",
        },
      },
    ],
  },
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "!components/**/*.d.ts",
    "!components/**/*.stories.{ts,tsx}",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
