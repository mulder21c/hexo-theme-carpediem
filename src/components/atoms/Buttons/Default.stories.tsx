import dedent from "ts-dedent";
import DefaultButton from "./Default";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DefaultButton> = {
  title: "Atoms/Button/Default Button",
  component: DefaultButton,
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
  parameters: {
    docs: {
      description: {
        component: dedent`## Overview

The Default Button component is a fundamental UI element that triggers actions when clicked.
It provides consistent styling and behavior across the application with various size and
appearance options.

## Key Features

### 🎨 Appearance Variations
- Multiple visual styles for different action hierarchies
- Consistent theming across all variations

### 📏 Size Options
- Flexible sizing from compact to full-width layouts
- Responsive design considerations built-in

### ♿ Accessibility Support
- **Semantic HTML**: Uses proper \`<button>\` element
- **Keyboard Navigation**: Fully accessible via keyboard
- **Focus Management**: Clear focus indicators

## Usage

The button accepts all standard HTML button attributes and can be used for form submissions,
navigation, or triggering actions.

## Usage Considerations

1. **Button Type**: Use appropriate \`type\` prop (button, submit, reset)
2. **Meaningful Labels**: Provide clear, descriptive button text
3. **Consistent Styling**: Choose appearance based on action hierarchy
4. **Responsive Design**: Consider using fluid size for mobile layouts`,
      },
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
