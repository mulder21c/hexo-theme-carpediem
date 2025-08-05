import icons from "feather-icons-react/build/icons.json";
import IconButton from "./Icon";
import { TooltipManager } from "@/components/atoms/Tooltip/ui";
import type { Meta, StoryObj } from "@storybook/react";

const iconNames = Object.keys(icons);

const meta: Meta<typeof IconButton> = {
  title: "Atoms/Button/Icon",
  component: IconButton,
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
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
  play: async () => {
    new TooltipManager();
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
