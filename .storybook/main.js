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
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  typescript: {
    reactDocgen: `react-docgen-typescript`,
    check: false,
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src')
    };

    // Disable URL processing in CSS loader
    const cssRule = config.module.rules.find(rule =>
      rule.test && rule.test.toString().includes('.css')
    );
    if (cssRule) {
      const cssLoader = cssRule.use.find(loader =>
        loader.loader && loader.loader.includes('css-loader')
      );
      if (cssLoader && cssLoader.options) {
        cssLoader.options.url = false;
      }
    }

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
  },
  staticDirs: [path.resolve(__dirname, '../source')],
};

module.exports = config;
