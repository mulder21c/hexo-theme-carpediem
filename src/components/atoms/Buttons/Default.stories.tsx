import DefaultButton from "./Default";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DefaultButton> = {
  title: "Components/Atoms/Button/Default",
  component: DefaultButton,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      description: `Button size`,
      options: ["small", "medium", "large", "fluid"],
    },
    appearance: {
      control: { type: "select" },
      description: `Button appearance`,
      options: ["fill", "outline"],
    },
    type: {
      control: { type: "select" },
      description: `HTML button type attribute`,
      options: ["button", "reset", "submit"],
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
