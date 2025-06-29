/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const path = require("path");
const { getScssLoaders } = require('../webpack.config.shared');

const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config) => {
    // Configuration for SCSS modules
    config.module.rules.push({
      test: /\.module\.scss$/,
      use: getScssLoaders(true, true)
    });

    // Configuration for regular SCSS files
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: getScssLoaders(false, true)
    });

    return config;
  }
};

module.exports = config;
