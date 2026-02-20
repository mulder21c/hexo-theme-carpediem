import dedent from "ts-dedent";
import Switch from "./index";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  argTypes: {
    size: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
    label: {
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
    label: "Get Alarm",
  },
  parameters: {
    docs: {
      description: {
        component: dedent`
        Renders a native switch toggle using a styled \`<input type="checkbox" role="switch">\` element.

        Provides on/off toggle functionality with three size variants (small, medium, large) and accessible labeling via \`label\` or \`aria-labelledby\` props.

        ## ✨ Key Features

        ### ⚙️ Behavior
        - Uses native HTML checkbox with \`role="switch"\` for semantic toggle behavior
        - Auto-generates unique \`id\` via \`useId()\` when not provided

        ### ♿ Accessibility
        - Requires either \`label\` or \`aria-labelledby\` prop for accessible naming
        - Uses \`role="switch"\` for proper screen reader announcement

        ## 🎨 Customization

        ### 💅 Styling
        - Additional styling possible through \`className\` prop
        - CSS modules provide default styles with theme support
      `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const DefaultOff: Story = {
  args: {
    label: "default OFF",
    checked: false,
  },
};

export const DefaultOn: Story = {
  args: {
    label: "default ON",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "disabled",
    disabled: true,
    checked: true,
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Switch size="small" label="Small" />
      <Switch size="medium" label="Medium" checked />
      <Switch size="large" label="Large" />
    </div>
  ),
};

export const AriaLabelledbyPriority: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <span id="external-switch-label">External label text</span>
      <Switch
        aria-labelledby="external-switch-label"
        label="This value is used as an aria-label fallback"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When `aria-labelledby` is provided, the accessible name uses the referenced external label in priority.",
      },
    },
  },
};
