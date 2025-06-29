import type { Meta, StoryObj } from "@storybook/react";
import DefaultButton from "./Default";

const meta: Meta<typeof DefaultButton> = {
  title: "Components/Atoms/Button",
  component: DefaultButton,
  parameters: {
    layout: "centered",
  },
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

// Default button story
export const Default: Story = {
  args: {
    children: "Button",
    size: "medium",
    appearance: "fill",
  },
};

// Size variations
export const Small: Story = {
  args: {
    children: "Small Button",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "large",
  },
};

export const Fluid: Story = {
  args: {
    children: "Fluid Button",
    size: "fluid",
  },
};

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
