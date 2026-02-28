import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";
import React from "react";
import { HexoProvider } from "../components/context";
import { mockHexoContext } from "./mocks/hexo-context";
import type { Preview } from "@storybook/react-vite";
import "../source/css/index.scss";

const preview: Preview = {
  decorators: [
    (Story) => (
      <HexoProvider value={mockHexoContext}>
        <Story />
      </HexoProvider>
    ),
  ],
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

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
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
