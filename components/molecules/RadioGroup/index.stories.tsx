import Radio from "@components/atoms/Radio";
import dedent from "ts-dedent";
import RadioGroup from "./index";
import type { RadioGroupOptionItem } from "./type";
import type { Meta, StoryObj } from "@storybook/react-vite";

const defaultOptions = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
] as Array<RadioGroupOptionItem>;

const meta: Meta<typeof RadioGroup> = {
  title: "Molecules/RadioGroup",
  component: RadioGroup,
  argTypes: {
    name: { table: { category: "Behavior" } },
    options: { table: { category: "Content" } },
    variant: {
      control: "select",
      table: { category: "Appearance" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    align: {
      control: "select",
      options: ["start", "center"],
      table: { category: "Appearance" },
    },
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: { category: "Layout" },
    },
    children: {
      table: { category: "Content" },
    },
  },
  parameters: {
    controls: {
      exclude: ["children", "className", "aria-label"],
    },
    docs: {
      description: {
        component: dedent`
          Renders a semantic radio group (\`role="radiogroup"\`) that contains multiple radio options with shared \`name\`.

          Use either the \`options\` prop (array of \`{ value, label, ... }\`) or \`children\` (one or more \`Radio\` elements). When using \`children\`, only \`Radio\` components should be used; \`Fragment\` is allowed for grouping.

          ## ✨ Key Features

          ### ⚙️ Behavior
          - Two content modes: \`options\` array or \`children\` (\`Radio\` elements); \`children\` takes precedence when both are provided
          - Validates that option \`value\`s are unique when using \`options\`; logs error and returns null if duplicates exist
          - Clones \`children\` to inject \`name\`, \`variant\`, \`size\`, and \`align\` from the group; supports \`Fragment\` in children
          - Renders nothing when neither \`options\` nor \`children\` are provided

          ### 🖱️ Interactions
          - Native radio behavior: only one option can be selected per group (via shared \`name\`)
          - Individual options can be \`disabled\` or \`checked\` via \`options\` or \`Radio\` props

          ### ♿ Accessibility
          - Uses \`role="radiogroup"\` on the wrapper \`<div>\`
          - **Provide \`aria-label\` or \`aria-labelledby\` on the group for screen readers**

          ## 🎨 Customization

          ### 💅 Styling
          - Additional styling possible through \`className\` prop
          - CSS modules provide default styles with theme support

          ## ⚠️ Notes

          - When using \`children\`, only \`Radio\` elements (and \`Fragment\`) are meaningful; other nodes are rendered as-is but do not receive group props.
          - This component is presentational and does not manage selection state; use controlled \`checked\` on options or form state externally.
        `,
      },
    },
  },
  args: {
    options: defaultOptions,
    "aria-label": "Radio group",
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Options: Story = {
  args: {
    name: "options",
    variant: "native",
    size: "medium",
    align: "start",
    direction: "vertical",
  },
};

export const OptionsWithDisabled: Story = {
  args: {
    name: "options-with-disabled",
    variant: "native",
    size: "medium",
    align: "start",
    direction: "vertical",
    options: [
      { value: "a", label: "Option A", checked: true },
      { value: "b", label: "Option B", disabled: true },
      { value: "c", label: "Option C" },
    ],
  },
};

export const WithChildren: Story = {
  parameters: {
    controls: {
      exclude: ["className"],
    },
  },
  argTypes: {
    options: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  args: {
    variant: "native",
    size: "medium",
    align: "start",
    direction: "horizontal",
    children: (
      <>
        <Radio name="children" value="yes" label="Yes" checked />
        <Radio name="children" value="no" label="No" />
      </>
    ),
  },
};

export const DirectionHorizontal: Story = {
  parameters: {
    controls: {
      exclude: ["children", "className"],
    },
  },
  args: {
    name: "horizontal",
    direction: "horizontal",
    variant: "native",
    size: "medium",
    align: "start",
  },
};

export const DirectionVertical: Story = {
  parameters: {
    controls: {
      exclude: ["children", "className"],
    },
  },
  args: {
    name: "vertical",
    direction: "vertical",
    variant: "native",
    size: "medium",
    align: "start",
  },
};

export const VariantOutlineHorizontal: Story = {
  args: {
    name: "outline-horizontal",
    variant: "outline",
    size: "medium",
    align: "start",
    direction: "horizontal",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const VariantOutlineVertical: Story = {
  args: {
    name: "outline-vertical",
    variant: "outline",
    size: "medium",
    align: "start",
    direction: "vertical",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const VariantButtonHorizontal: Story = {
  args: {
    name: "button-horizontal",
    variant: "button",
    size: "medium",
    align: "center",
    direction: "horizontal",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

export const VariantButtonVertical: Story = {
  args: {
    name: "button-vertical",
    variant: "button",
    direction: "vertical",
    size: "medium",
    align: "start",
    options: defaultOptions,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};
