import dedent from "ts-dedent";
import Button from "./Base";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button/BaseButton",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      table: {
        category: "Appearance",
      },
      description: "Button visual style variant",
    },
    color: {
      control: "select",
      table: {
        category: "Appearance",
      },
      description: "Button color scheme",
    },
    size: {
      control: "select",
      table: {
        category: "Appearance",
      },
      description: "Button size",
    },
    type: {
      control: "select",
      table: {
        category: "Behavior",
      },
      description: "HTML button type attribute",
    },
    children: {
      control: "text",
      table: {
        category: "Content",
        type: { summary: "React.ReactNode" },
      },
      description: "Button content",
    },
  },
  args: {
    size: "medium",
    type: "button",
    variant: "contained",
    color: "primary",
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        component: dedent`
          Renders a semantic \`<button>\` element with configurable size, color, variant, and type.<br>
          Accepts contents via the 'children' prop.

          The button uses CSS variables for theming and is accessible by default.<br>
          This component does not include interactive logic, focusing purely on visual and semantic output.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexFlow: "row wrap",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Variants: Story = {
  render: (args) => (
    <>
      <Button {...args} variant="contained" />
      <Button {...args} variant="outlined" />
    </>
  ),
  parameters: {
    controls: {
      exclude: ["variant"],
    },
    docs: {
      description: {
        story: "Button variant styles: contained and outlined",
      },
    },
    viewMode: "docs",
  },
};

export const Colors: Story = {
  render: (args) => (
    <>
      <Button {...args} color="primary" />
      <Button {...args} color="secondary" />
    </>
  ),
  parameters: {
    controls: {
      exclude: ["color"],
    },
    docs: {
      description: {
        story: "Button color schemes: primary and secondary",
      },
    },
    viewMode: "docs",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <Button {...args} size="small" />
      <Button {...args} size="medium" />
      <Button {...args} size="large" />
    </>
  ),
  parameters: {
    controls: {
      exclude: ["size"],
    },
    docs: {
      description: {
        story: "Button sizes: small, medium, and large",
      },
    },
    viewMode: "docs",
  },
};
