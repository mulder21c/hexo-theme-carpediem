/** @type { import('@storybook/react-webpack5').Preview } */
import "../source/css/style.css";
import localeKo from "./locale/ko.json";

const preview = {
  tags: ["autodocs"],
  parameters: {
    a11y: {
      config: {
        locale: localeKo,
      },
    },
    backgrounds: {
      options: {
        light: { name: "Light", value: "#f2f2f2" },
        dark: { name: "Dark", value: "#1f292d" }
      }
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
