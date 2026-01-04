import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import { fileURLToPath } from "url";
import type { Configuration } from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-webpack5",
  typescript: {
    reactDocgen: `react-docgen-typescript`,
    check: true,
  },
  staticDirs: [{ from: "../source/fonts", to: "/fonts" }],
  webpackFinal: async (config: Configuration) => {
    if (!config.resolve) {
      config.resolve = {};
    }

    // Configure TypeScript path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      "@source": path.resolve(__dirname, "../source"),
      "@components": path.resolve(__dirname, "../components"),
      "@layout": path.resolve(__dirname, "../layout"),
    };

    // Configure CSS modules and SCSS processing
    if (!config.module) {
      config.module = {};
    }
    if (!config.module.rules) {
      config.module.rules = [];
    }

    // Remove SCSS-related rules from existing rules and modify CSS rules
    const rules = (config.module.rules || []).filter((rule) => {
      if (!rule || typeof rule !== "object") return true;
      if ("test" in rule && rule.test instanceof RegExp) {
        // Remove existing SCSS-related rules
        if (rule.test.test(".scss") || rule.test.test(".sass")) {
          return false;
        }
      }
      return true;
    });

    // Modify existing CSS rules to exclude SCSS
    const modifiedRules = rules.map((rule) => {
      if (
        rule &&
        typeof rule === "object" &&
        "test" in rule &&
        rule.test instanceof RegExp &&
        rule.test.test(".css") &&
        !rule.test.test(".scss")
      ) {
        const existingExclude = rule.exclude;
        const scssExclude = /\.(scss|sass)$/;

        if (Array.isArray(existingExclude)) {
          return {
            ...rule,
            exclude: [...existingExclude, scssExclude],
          };
        } else if (existingExclude) {
          return {
            ...rule,
            exclude: [existingExclude, scssExclude],
          };
        } else {
          return {
            ...rule,
            exclude: scssExclude,
          };
        }
      }
      return rule;
    });

    // SCSS module file processing rule (highest priority)
    const scssModuleRule = {
      test: /\.module\.(scss|sass)$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[local]--[hash:base64:5]",
              exportLocalsConvention: "camelCase",
              namedExport: false,
            },
            importLoaders: 1,
            esModule: true,
            url: {
              filter: (url: string) => {
                // Keep absolute paths (paths starting with /) as-is
                return !url.startsWith("/");
              },
            },
          },
        },
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              includePaths: [path.resolve(__dirname, "../source/css")],
            },
          },
        },
      ],
    };

    // Regular SCSS file processing rule
    const scssRule = {
      test: /\.(scss|sass)$/,
      exclude: /\.module\.(scss|sass)$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            esModule: true,
            url: {
              filter: (url: string) => {
                // Keep absolute paths (paths starting with /) as-is
                return !url.startsWith("/");
              },
            },
          },
        },
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              includePaths: [path.resolve(__dirname, "../source/css")],
            },
          },
        },
      ],
    };

    // Add SCSS rules at the beginning to give priority
    config.module.rules = [scssModuleRule, scssRule, ...modifiedRules];

    return config;
  },
};

export default config;
