import type { Meta, StoryObj } from "@storybook/react";
import icons from "feather-icons-react/build/icons.json";
import IconButton from "./Icon";

const iconNames = Object.keys(icons);

const meta: Meta<typeof IconButton> = {
  title: "Components/Atoms/Button/Icon",
  component: IconButton,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
    },
    appearance: {
      control: { type: "select" },
    },
    type: {
      control: { type: "select" },
    },
    icon: {
      control: { type: "select" },
      options: iconNames,
    },
    stroke: {
      control: { type: "select" },
    },
  },
  args: {
    label: "activity",
    icon: "activity",
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Appearance variations
export const Fill: Story = {
  args: {
    appearance: "fill",
  },
};

export const Outline: Story = {
  args: {
    appearance: "outline",
  },
};
