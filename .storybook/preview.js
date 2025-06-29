/** @type { import('@storybook/react-webpack5').Preview } */
import "../source/css/style.css";

const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
