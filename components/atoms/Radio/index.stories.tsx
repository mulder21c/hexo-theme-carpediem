import dedent from "ts-dedent";
import Radio from "./index";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  argTypes: {
    variant: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
    size: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
    align: {
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
    value: {
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
    variant: "native",
    size: "medium",
    name: "demo",
    value: "option1",
    label: "Option 1",
  },
  parameters: {
    docs: {
      description: {
        component: dedent`
          Renders a semantic radio button input (\`<input type="radio">\`) with configurable variant, size, and label options.

          Accepts label content via the \`label\` prop or \`children\` prop. When both are provided, \`label\` becomes \`aria-label\` for accessibility.

          ## ✨ Key Features

          ### ⚙️ Behavior
          - Requires either \`label\` or \`children\` prop (logs warning and returns \`null\` if both are missing)
          - When \`children\` is provided, \`label\` prop becomes \`aria-label\` for screen readers
          - Auto-generates unique \`id\` attribute if not provided (using React's \`useId\`)
          - Supports radio groups through the \`name\` prop (all radios with the same \`name\` are grouped)

          ### 🖱️ Interactions
          - Standard radio button behavior: clicking selects the option and deselects others in the same group
          - Keyboard navigation: Tab to focus, Space/Arrow keys to select
          - Supports controlled and uncontrolled modes via \`checked\` prop

          ### ♿ Accessibility
          - Automatic \`id\` generation ensures unique identifiers
          - Proper \`label\` element with \`htmlFor\` attribute linked to input \`id\`
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
          - All radios in a group must share the same \`name\` prop value.
        `,
      },
    },
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    name: "default",
    value: "option1",
    label: "Option 1",
  },
  parameters: {
    docs: {
      description: {
        story: "Default radio with all controls available for interactive testing.",
      },
    },
  },
};

export const LabelOnly: Story = {
  args: {
    name: "label-only",
    value: "yes",
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
    value: "pro",
  },
  render: (args) => (
    <Radio {...args}>
      <span>
        <strong>Pro Plan</strong>
        <br />
        <small>$29/month - All features included</small>
      </span>
    </Radio>
  ),
  parameters: {
    docs: {
      description: {
        story: dedent`
          **Children-only usage**: Rich content with formatting.

          ⚠️ **Warning**: If children contain no accessible text, provide \`label\` for screen readers.

          Check the browser console - if children have no text content and no label is provided,
          a warning will be logged.
        `,
      },
    },
  },
};

export const LabelAndChildren: Story = {
  args: {
    name: "label-children",
    value: "premium",
    label: "Premium subscription option at $99 per month",
  },
  render: (args) => (
    <Radio {...args}>
      <span>
        <strong>💎 Premium</strong>
        <br />
        <small>$99/month</small>
      </span>
    </Radio>
  ),
  parameters: {
    docs: {
      description: {
        story: dedent`
          **Label + Children usage**: Children are displayed visually, label becomes \`aria-label\`.

          This pattern is useful when:
          - Visual content includes icons or complex formatting
          - Screen reader users need a clearer description
          - The visual label is too short or uses abbreviations
        `,
      },
    },
  },
};

export const NativeVariant: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
      <Radio name="native-variant" value="s" label="Small" size="small" />
      <Radio name="native-variant" value="m" label="Medium" size="medium" />
      <Radio name="native-variant" value="l" label="Large" size="large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Native variant - Traditional circular radio button indicator in all sizes.",
      },
    },
  },
};

export const ButtonVariant: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
      <Radio
        name="button-variant"
        value="s"
        label="Small"
        variant="button"
        size="small"
      />
      <Radio
        name="button-variant"
        value="m"
        label="Medium"
        variant="button"
        size="medium"
      />
      <Radio
        name="button-variant"
        value="l"
        label="Large"
        variant="button"
        size="large"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Button variant - Button-like appearance with outline border in all sizes.",
      },
    },
  },
};

export const OutlineVariant: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "2rem" }}
    >
      <Radio
        name="outline-variant"
        variant="outline"
        value="s"
        label="Small"
        size="small"
      />
      <Radio
        name="outline-variant"
        variant="outline"
        value="m"
        label="Medium"
        size="medium"
      />
      <Radio
        name="outline-variant"
        variant="outline"
        value="l"
        label="Large"
        size="large"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: dedent`
          Outline variant - Outline button style with filled background on selection.
        `,
      },
    },
  },
};

export const Align: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Native variant</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "3rem",
          }}
        >
          <div style={{ width: "220px" }}>
            <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
              {`align="start"`}
            </p>
            <Radio
              name="align-native"
              value="start"
              label="This is a very long label that should wrap to multiple lines"
              variant="native"
              align="start"
            />
          </div>
          <div style={{ width: "220px" }}>
            <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
              {`align="center"`}
            </p>
            <Radio
              name="align-native"
              value="center"
              label="This is a very long label that should wrap to multiple lines"
              variant="native"
              align="center"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Outline variant</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "3rem",
          }}
        >
          <div style={{ width: "220px" }}>
            <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
              {`align="start"`}
            </p>
            <div style={{ width: "220px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Radio
                  name="long-button"
                  value="a"
                  label="This is a very long label that should wrap to multiple lines when the container is narrow"
                  variant="outline"
                  align="start"
                />
                <Radio
                  name="long-button"
                  value="b"
                  label="Short label"
                  variant="outline"
                  align="start"
                />
              </div>
            </div>
          </div>
          <div style={{ width: "220px" }}>
            <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
              {`align="center"`}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Radio
                name="long-button"
                value="a"
                label="This is a very long label that should wrap to multiple lines when the container is narrow"
                variant="outline"
                align="center"
              />
              <Radio
                name="long-button"
                value="b"
                label="Short label"
                variant="outline"
                align="center"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Button variant</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "3rem",
          }}
        >
          <div style={{ width: "220px" }}>
            <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
              {`align="start"`}
            </p>
            <div style={{ width: "220px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Radio
                  name="align-button"
                  value="a"
                  label="This is a very long label that should wrap to multiple lines when the container is narrow"
                  variant="button"
                  align="start"
                />
                <Radio
                  name="align-button"
                  value="b"
                  label="Short label"
                  variant="button"
                  align="start"
                />
              </div>
            </div>
          </div>
          <div style={{ width: "220px" }}>
            <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
              {`align="center"`}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Radio
                name="align-button"
                value="a"
                label="This is a very long label that should wrap to multiple lines when the container is narrow"
                variant="button"
                align="center"
              />
              <Radio
                name="align-button"
                value="b"
                label="Short label"
                variant="button"
                align="center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: dedent`
          \`align\` controls label alignment.

          - **start** (default): Label aligned to the start.
          - **center**: Native variant uses \`text-align: center\` on the label; outline/button variant uses \`justify-content: center\` on the label.
        `,
      },
    },
  },
};

export const InteractiveStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Default State</h3>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Radio name="state-default-native" value="a" label="Native" variant="native" />
          <Radio name="state-default-button" value="a" label="Button" variant="button" />
          <Radio
            name="state-default-outline"
            value="a"
            label="Outline"
            variant="outline"
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Checked State</h3>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Radio
            name="state-checked-native"
            value="a"
            label="Native"
            variant="native"
            checked
          />
          <Radio
            name="state-checked-button"
            value="a"
            label="Button"
            variant="button"
            checked
          />
          <Radio
            name="state-checked-outline"
            value="a"
            label="Outline"
            variant="outline"
            checked
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Focus State (Tab to see)</h3>
        <p style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "#666" }}>
          Press Tab key to focus on these radios and see the focus ring
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Radio
            name="state-focus-native"
            value="a"
            label="Native (Tab here)"
            variant="native"
          />
          <Radio
            name="state-focus-button"
            value="a"
            label="Button (Tab here)"
            variant="button"
          />
          <Radio
            name="state-focus-outline"
            value="a"
            label="Outline (Tab here)"
            variant="outline"
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Disabled State</h3>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Radio
            name="state-disabled-native"
            value="a"
            label="Native (disabled)"
            variant="native"
            disabled
          />
          <Radio
            name="state-disabled-native"
            value="b"
            label="Native checked (disabled)"
            variant="native"
            disabled
            checked
          />
        </div>
        <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
          <Radio
            name="state-disabled-button"
            value="a"
            label="Button (disabled)"
            variant="button"
            disabled
          />
          <Radio
            name="state-disabled-button"
            value="b"
            label="Button checked (disabled)"
            variant="button"
            disabled
            checked
          />
        </div>
        <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
          <Radio
            name="state-disabled-outline"
            value="a"
            label="Outline (disabled)"
            variant="outline"
            disabled
          />
          <Radio
            name="state-disabled-outline"
            value="b"
            label="Outline checked (disabled)"
            variant="outline"
            disabled
            checked
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All interactive states: default, checked, focus, and disabled.",
      },
    },
  },
};

export const LongLabel: Story = {
  render: () => (
    <div
      style={{ maxWidth: "400px", display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Native Variant</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Radio
            name="long-native"
            value="a"
            label="This is a very long label that should wrap to multiple lines when the container is narrow"
            variant="native"
          />
          <Radio name="long-native" value="b" label="Short label" variant="native" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Button Variant</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Radio
            name="long-button-variant"
            value="a"
            label="This is a very long label that should wrap to multiple lines when the container is narrow"
            variant="button"
          />
          <Radio
            name="long-button-variant"
            value="b"
            label="Short label"
            variant="button"
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Outline Variant</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Radio
            name="long-outline"
            value="a"
            label="This is a very long label that should wrap to multiple lines when the container is narrow"
            variant="outline"
          />
          <Radio name="long-outline" value="b" label="Short label" variant="outline" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Long labels wrap to multiple lines. Text wrapping is enabled by default for accessibility.",
      },
    },
  },
};

export const RichContent: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Pricing Cards (Outline Variant)</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Radio
            name="pricing"
            value="free"
            label="Free tier with basic features"
            variant="outline"
            size="large"
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Free</div>
              <div style={{ fontSize: "0.875rem" }}>$0/month</div>
            </div>
          </Radio>
          <Radio
            name="pricing"
            value="pro"
            label="Pro tier with advanced features"
            variant="outline"
            size="large"
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Pro</div>
              <div style={{ fontSize: "0.875rem" }}>$29/month</div>
            </div>
          </Radio>
          <Radio
            name="pricing"
            value="enterprise"
            label="Enterprise tier with all features and support"
            variant="outline"
            size="large"
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Enterprise</div>
              <div style={{ fontSize: "0.875rem" }}>Contact us</div>
            </div>
          </Radio>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Option Buttons (Button Variant)</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Radio
            name="option-button"
            value="yes"
            label="Yes option"
            variant="button"
            size="medium"
          />
          <Radio
            name="option-button"
            value="no"
            label="No option"
            variant="button"
            size="medium"
          />
          <Radio
            name="option-button"
            value="maybe"
            label="Maybe option"
            variant="button"
            size="medium"
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>With Icons (Native Variant)</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Radio
            name="delivery"
            value="standard"
            label="Standard delivery option - 5-7 business days"
            variant="native"
          >
            <span>
              📦 Standard Delivery <small style={{ opacity: 0.7 }}>(5-7 days)</small>
            </span>
          </Radio>
          <Radio
            name="delivery"
            value="express"
            label="Express delivery option - 2-3 business days"
            variant="native"
          >
            <span>
              🚀 Express Delivery <small style={{ opacity: 0.7 }}>(2-3 days)</small>
            </span>
          </Radio>
          <Radio
            name="delivery"
            value="overnight"
            label="Overnight delivery option - next business day"
            variant="native"
          >
            <span>
              ⚡ Overnight Delivery <small style={{ opacity: 0.7 }}>(Next day)</small>
            </span>
          </Radio>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: dedent`
          Rich content using \`children\` prop with \`label\` for accessibility.

          When using complex children (icons, multiple elements), always provide a \`label\` prop
          with a clear text description for screen reader users.
        `,
      },
    },
  },
};
