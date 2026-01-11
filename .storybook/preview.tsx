import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";
import React from "react";
import type { Preview } from "@storybook/react-webpack5";
import "../source/css/index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
    backgrounds: {
      options: {
        light: {
          name: "Light",
          value: "#f8f9fa",
        },
        dark: {
          name: "Dark",
          value: "#10161c",
        },
      },
    },
    layout: "centered",
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
  initialGlobals: {
    backgrounds: {
      value: "light",
    },
  },
  tags: ["autodocs"],
};

export default preview;
