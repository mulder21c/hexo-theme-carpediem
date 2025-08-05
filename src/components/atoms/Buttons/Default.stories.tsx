import DefaultButton from "./Default";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DefaultButton> = {
  title: "Atoms/Button/Default",
  component: DefaultButton,
  parameters: {},
  argTypes: {
    children: {
      table: { disable: true },
    },
    size: {
      control: { type: "select" },
    },
    appearance: {
      control: { type: "select" },
    },
    type: {
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultButton>;

// Appearance variations
export const Fill: Story = {
  args: {
    children: "Fill Button",
    appearance: "fill",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    appearance: "outline",
  },
};

export const Fluid: Story = {
  args: {
    children: "Fluid Button",
    size: "fluid",
    appearance: "fill",
  },
};
