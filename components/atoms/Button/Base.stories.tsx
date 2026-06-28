import dedent from "ts-dedent";
import Button from "./Base";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button/BaseButton",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
    color: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
    size: {
      control: "select",
      options: ["x-small", "small", "medium", "large"],
      table: {
        category: "Appearance",
      },
    },
    type: {
      control: "select",
      table: {
        category: "Behavior",
      },
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
          Renders a semantic \`<button>\` element with configurable size, color, variant, and type.

          Accepts contents via the \`children\` prop.

          ## ✨ Key Features

          ### ⚙️ Behavior
          - Configurable button type (button, submit, reset) via the \`type\` prop
          - Supports all standard HTML button attributes

          ### ♿ Accessibility
          - Uses semantic HTML button element
          - Accessible by default
          - Supports all standard HTML button attributes (id, aria-*, etc.)
          - Screen reader compatible

          ## 🎨 Customization

          ### 💅 Styling
          - Uses CSS variables for theming
          - Additional styling possible through \`className\` prop

          ## ⚠️ Notes

          - This component does not include interactive logic, focusing purely on visual and semantic output
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
      <Button {...args} size="x-small" />
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
        story: "Button sizes: x-small, small, medium, and large",
      },
    },
    viewMode: "docs",
  },
};
