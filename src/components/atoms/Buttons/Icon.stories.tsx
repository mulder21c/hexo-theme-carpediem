import dedent from "ts-dedent";
import icons from "feather-icons-react/build/icons.json";
import IconButton from "./Icon";
import { TooltipManager } from "@/components/atoms/Tooltip/ui";
import type { Meta, StoryObj } from "@storybook/react";

const iconNames = Object.keys(icons);

const meta: Meta<typeof IconButton> = {
  title: "Atoms/Button/Icon Button",
  component: IconButton,
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
      description: {
        component: dedent`## Overview

  The Icon Button component provides a compact, icon-based interface for triggering actions.
  Built with Feather Icons and integrated tooltip functionality, it offers an accessible
  and space-efficient alternative to text buttons.

  ## Key Features

  ### 🎨 Appearance Variations
  - Multiple visual styles for different action hierarchies
  - Consistent theming with Default Button component

  ### 📏 Size Options
  - Flexible sizing optimized for icon display
  - Maintains proper icon proportions across all sizes

  ### 🎯 Icon Integration
  - **Feather Icons**: Extensive library of consistent, scalable icons
  - **Stroke Weight**: Customizable icon stroke thickness (thin, medium, thick)
  - **Semantic Icons**: Choose icons that clearly represent the action

  ### 💬 Tooltip Support
  - **Accessible Labels**: Built-in tooltip with proper ARIA labeling
  - **Flexible Positioning**: Configurable tooltip placement and alignment
  - **Hover & Focus**: Tooltip appears on both mouse hover and keyboard focus

  ### ♿ Accessibility Support
  - **Screen Reader Friendly**: Proper ARIA labeling with tooltip content
  - **Keyboard Navigation**: Full keyboard accessibility
  - **Focus Management**: Clear focus indicators

  ## Usage

  Icon buttons are ideal for toolbars, navigation, and actions where space is limited.
  The tooltip provides context while maintaining a clean, minimal interface.

  ## Usage Considerations

  1. **Icon Selection**: Choose universally recognizable icons
  2. **Tooltip Labels**: Provide clear, concise action descriptions
  3. **Context Awareness**: Consider icon meaning in different cultural contexts
  4. **Consistency**: Use consistent stroke weights and sizes within the same interface`,
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
