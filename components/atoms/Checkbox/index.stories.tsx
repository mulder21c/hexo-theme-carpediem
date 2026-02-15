import dedent from "ts-dedent";
import Checkbox from "./index";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
    name: {
      table: {
        category: "Behavior",
      },
    },
    label: {
      table: {
        category: "Content",
      },
    },
    children: {
      table: {
        category: "Content",
      },
    },
    checked: {
      table: {
        category: "State",
      },
    },
    disabled: {
      description: "Disabled state",
      table: {
        category: "State",
      },
    },
    id: {
      table: {
        category: "HTML Attributes",
      },
    },
    className: {
      table: {
        category: "HTML Attributes",
      },
    },
  },
  args: {
    size: "medium",
    name: "demo",
    label: "Checkbox Option",
  },
  parameters: {
    docs: {
      description: {
        component: dedent`
          Renders a semantic checkbox input (\`<input type="checkbox">\`) with configurable size and label options.

          Accepts label content via the \`label\` prop or \`children\` prop. When both are provided, \`label\` becomes \`aria-label\` for accessibility.

          ## ✨ Key Features

          ### ⚙️ Behavior
          - Requires either \`label\` or \`children\` prop (logs warning and returns \`null\` if both are missing)
          - When \`children\` is provided, \`label\` prop becomes \`aria-label\` for screen readers
          - Auto-generates unique \`id\` attribute if not provided (using React's \`useId\`)

          ### 🖱️ Interactions
          - Standard checkbox behavior: clicking toggles the checked state
          - Keyboard navigation: Tab to focus, Space to toggle

          ### ♿ Accessibility
          - Automatic \`id\` generation ensures unique identifiers
          - \`aria-label\` support when using \`children\` with \`label\` prop
          - Semantic HTML structure with proper input-label relationship
          - Screen reader compatible

          ## 🎨 Customization

          ### 💅 Styling
          - Additional styling possible through \`className\` prop
          - CSS modules provide default styles with theme support

          ## ⚠️ Notes

          - **IMPORTANT**: At least one of \`label\` or \`children\` must be provided. The component will log a warning and return \`null\` if both are missing.
          - When using \`children\` with no text content, always provide \`label\` for accessibility.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    name: "default",
    label: "Default Checkbox",
  },
  parameters: {
    docs: {
      description: {
        story: "Default checkbox with all controls available for interactive testing.",
      },
    },
  },
};

export const LabelOnly: Story = {
  args: {
    name: "label-only",
    label: "I agree to the terms and conditions",
  },
  parameters: {
    docs: {
      description: {
        story: dedent`
          **Label-only usage**: When only \`label\` is provided, it displays as the visible label text.
          This is the simplest and most common usage pattern.
        `,
      },
    },
  },
};

export const ChildrenOnly: Story = {
  args: {
    name: "children-only",
  },
  render: (args) => (
    <Checkbox {...args}>
      <span>
        I accept the <strong>Terms of Service</strong>
      </span>
    </Checkbox>
  ),
  parameters: {
    docs: {
      description: {
        story: dedent`
          **Children-only usage**: Custom content via \`children\` prop. Allows rich content like styled text.
          Note: When using children with no visible text, provide \`label\` for accessibility.
        `,
      },
    },
  },
};

export const LabelAndChildren: Story = {
  args: {
    name: "label-and-children",
    label: "Premium subscription option at $99 per month",
  },
  render: (args) => (
    <Checkbox {...args}>
      <span>
        <strong>💎 Premium</strong>
        <br />
        <small>$99/month</small>
      </span>
    </Checkbox>
  ),
  parameters: {
    docs: {
      description: {
        story: dedent`
          **Both label and children**: When both are provided, \`children\` is displayed visually
          and \`label\` becomes the \`aria-label\` for screen readers.

          This is useful when the visual content contains interactive elements (like links)
          but you want a simpler accessible name.
        `,
      },
    },
  },
};

export const Checked: Story = {
  args: {
    name: "checked",
    label: "Pre-selected option",
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: dedent`
          **Initial checked state**: Use the \`checked\` prop to set the initial checked state.
        `,
      },
    },
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox name="size-comparison" label="Small checkbox" size="small" />
      <Checkbox name="size-comparison" label="Medium checkbox" size="medium" />
      <Checkbox name="size-comparison" label="Large checkbox" size="large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all three size variants side by side.",
      },
    },
  },
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Checkbox name="interests" label="Music" />
      <Checkbox name="interests" label="Movies" checked />
      <Checkbox name="interests" label="Sports" />
      <Checkbox name="interests" label="Reading" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: dedent`
          **Multiple checkboxes**: Unlike radio buttons, checkboxes allow multiple selections.
          Each checkbox operates independently.
        `,
      },
    },
  },
};

export const LongLabel: Story = {
  args: {
    name: "long-label",
    label:
      "This is a very long label that demonstrates how the checkbox component handles text wrapping when the content exceeds the available width of the container",
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with a long label to demonstrate text wrapping behavior.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export const RichContent: Story = {
  args: {
    name: "rich-content",
    label: "Subscribe to newsletter",
  },
  render: (args) => (
    <Checkbox {...args}>
      <span>
        📦 Standard Delivery
        <small style={{ opacity: 0.7 }}>(5-7 days)</small>
      </span>
    </Checkbox>
  ),
  parameters: {
    docs: {
      description: {
        story: dedent`
          **Rich content in children**: The \`children\` prop allows for formatted text,
          icons, or other React elements as the checkbox label.
        `,
      },
    },
  },
};
