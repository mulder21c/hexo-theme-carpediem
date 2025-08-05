import React, { useEffect } from "react";
import dedent from "ts-dedent";
import Tooltip from "./index";
import { TooltipManager } from "./ui";
import { useArgs } from "storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { TooltipConfig } from "./type";

const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
      description: {
        component: dedent`## Overview

The Tooltip component is a small popup UI component that provides additional information when users
hover over specific elements. It is implemented using the compound component pattern with Context
API and designed with accessibility and usability in mind.

## Key Features

### 🎯 Position and Alignment Options
- **4 Placement Directions**: Can be positioned above, below, left, or right relative to the
trigger element
- **3 Alignment Methods**: Supports start alignment, center alignment, and end alignment relative
to the trigger element

Automatically adjusts to optimal position when it would extend beyond viewport boundaries, ensuring
tooltips are always visible on screen.

### 🎨 Visual Elements
- **Arrow Display**: Arrow that clearly shows the relationship between tooltip and trigger element
- **Smooth Animation**: Fade in/out transition effect with 200ms duration

### ♿ Accessibility Support
- **Keyboard Focus**: Shows/hides tooltip when trigger element receives focus/blur
- **ESC Key Support**: Hides active tooltip with ESC key

## Usage

Assign a unique ID to the trigger element and connect it by passing the same ID as the \`triggerId\`
prop.

## Usage Considerations

1. **Unique triggerId**: Each tooltip must have a unique \`triggerId\`
2. **Trigger Element Matching**: The \`triggerId\` and the trigger element's \`id\` must match
exactly
3. **Containing Block**: Tooltip positioning is based on the trigger element, so the trigger must
be a containing block. If the trigger cannot be a containing block, you can wrap it with
\`Tooltip.Container\` to create a containing block`,
      },
    },
    layout: "padded",
  },
  argTypes: {
    placement: {
      control: "select",
    },
    alignment: {
      control: "select",
    },
  },
  tags: ["autodocs"],
  play: async () => {
    window.tooltip = new TooltipManager();
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    triggerId: "basic-tooltip",
    placement: "top",
    alignment: "center",
  },
  render: function (args) {
    const [options] = useArgs<TooltipConfig>();

    useEffect(() => {
      if (window.tooltip) {
        window.tooltip.destroy();

        const tooltip = document.querySelector<HTMLElement>(`[role="tooltip"]`);
        tooltip?.setAttribute("data-placement", options.placement);
        tooltip?.setAttribute("data-alignment", options.alignment);

        window.tooltip = new TooltipManager();
      }
    }, [options]);

    return (
      <Tooltip {...args}>
        <Tooltip.Container>
          <button id={args.triggerId} type="button" style={{ lineHeight: "inherit" }}>
            Trigger
          </button>
          <Tooltip.Content>This is description.</Tooltip.Content>
        </Tooltip.Container>
      </Tooltip>
    );
  },
};
