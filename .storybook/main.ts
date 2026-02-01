import path from "path";
import { fileURLToPath } from "url";
import type { StorybookConfig } from "@storybook/react-vite";
import type { UserConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-vitest", "@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  typescript: {
    reactDocgen: `react-docgen-typescript`,
    check: true,
  },
  staticDirs: [
    { from: "../source/fonts", to: "/fonts" },
    { from: "../source/js", to: "/js" },
  ],
  previewBody: (body) => {
    return `
      ${body}
      <script defer src="/js/ui.js"></script>
    `;
  },
  viteFinal: async (config: UserConfig) => {
    if (!config.resolve) {
      config.resolve = {};
    }

    // Configure TypeScript path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      "@source": path.resolve(__dirname, "../source"),
      "@components": path.resolve(__dirname, "../components"),
      "@context": path.resolve(__dirname, "../components/context"),
      "@layout": path.resolve(__dirname, "../layout"),
    };

    // Configure CSS modules for SCSS
    if (!config.css) {
      config.css = {};
    }
    if (!config.css.modules) {
      config.css.modules = {};
    }
    config.css.modules = {
      ...config.css.modules,
      generateScopedName: "[local]--[hash:base64:5]",
      localsConvention: "camelCase",
    };

    // Configure SCSS options
    if (!config.css.preprocessorOptions) {
      config.css.preprocessorOptions = {};
    }
    config.css.preprocessorOptions.scss = {
      ...config.css.preprocessorOptions.scss,
      includePaths: [path.resolve(__dirname, "../source/css")],
    };

    return config;
  },
};

export default config;
