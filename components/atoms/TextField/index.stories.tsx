import dedent from "ts-dedent";
import TextField from "./index";
import type { TextFieldSize, TextFieldType } from "./type";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FeatherIconName } from "feather-icons-react";

const textFieldTypes: TextFieldType[] = ["text", "password", "search", "url", "email"];
const textFieldSizes: TextFieldSize[] = ["small", "medium", "large"];
const featherIconNames = [
  "search",
  "mail",
  "lock",
  "user",
  "key",
  "link",
  "globe",
  "phone",
  "calendar",
  "map-pin",
  "tag",
  "hash",
  "edit",
  "eye",
  "eye-off",
  "alert-circle",
  "check-circle",
  "x-circle",
  "info",
  "settings",
] satisfies FeatherIconName[];
const featherIconOptions = [undefined, ...featherIconNames] satisfies Array<
  FeatherIconName | undefined
>;

const meta: Meta<typeof TextField> = {
  title: "Atoms/TextField",
  component: TextField,
  argTypes: {
    type: {
      control: "select",
      options: textFieldTypes,
      table: {
        category: "Behavior",
      },
    },
    variant: {
      control: "select",
      options: ["outlined", "underlined"],
      table: {
        category: "Appearance",
      },
    },
    size: {
      control: "select",
      options: textFieldSizes,
      table: {
        category: "Appearance",
      },
    },
    icon: {
      control: "select",
      options: featherIconOptions,
      table: {
        category: "Content",
      },
    },
    placeholder: {
      table: {
        disable: true,
      },
    },
    readOnly: {
      control: "boolean",
      table: {
        category: "State",
      },
    },
    disabled: {
      control: "boolean",
      table: {
        category: "State",
      },
    },
    "aria-invalid": {
      table: {
        disable: true,
      },
    },
    name: {
      control: "text",
      table: {
        category: "HTML Attributes",
      },
    },
    id: {
      control: "text",
      table: {
        category: "HTML Attributes",
      },
    },
    "aria-label": {
      table: {
        disable: true,
      },
    },
    "aria-labelledby": {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        category: "HTML Attributes",
      },
    },
  },
  args: {
    "aria-label": "Text field",
    name: "textfield",
    type: "text",
    variant: "outlined",
    size: "medium",
    placeholder: "Enter text",
    icon: undefined,
  },
  parameters: {
    docs: {
      description: {
        component: dedent`
          Renders a single-line text input: a native \`<input>\` inside a styled \`inline-flex\` wrapper with optional leading Feather icon, \`outlined\` or \`underlined\` chrome, and \`small\` / \`medium\` / \`large\` sizes. This atom does not render a visible label—compose \`<label htmlFor>\`, \`aria-label\`, or \`aria-labelledby\` in the parent.

          ## ✨ Key Features

          ### ⚙️ Behavior
          - Root is a \`<span>\` (\`textfield\`) around \`<span class="textfield__field">\` and the \`<input>\`. Remaining \`React.InputHTMLAttributes<HTMLInputElement>\` pass to the input except \`type\`, \`size\`, and \`children\` (handled or omitted by \`TextFieldProps\`).
          - \`variant\` defaults to \`outlined\`; \`underlined\` uses only a bottom border on the field shell.
          - \`size\` drives height, padding, typography, and icon scale via module modifiers.
          - \`value\` is passed to the input as \`defaultValue\` (initial value for uncontrolled usage only).
          - When the inner input has \`aria-invalid="true"\`, the field border uses the invalid token (unless \`disabled\`).

          ### 🖱️ Interactions
          - Focus is on the native input; the root shows a focus ring when the input is focused (CSS \`:has()\` on \`.textfield__input:focus\`).
          - Keyboard and pointer behavior match a standard text \`<input>\` (including \`password\` masking when \`type="password"\`).

          ### ♿ Accessibility
          - Supply \`id\` with an external \`<label htmlFor={id}>\`, or \`aria-label\`, or \`aria-labelledby\` referencing visible naming text.
          - If none of \`id\`, \`aria-label\`, or \`aria-labelledby\` is provided, \`useHexo().hexoLog\` warns at runtime.
          - Optional \`icon\` is decorative: \`aria-hidden="true"\` and \`focusable="false"\` on the icon element.

          ## 🎨 Customization

          ### 💅 Styling
          - Pass \`className\` on the root \`<span>\` for layout or utility classes.
          - Presentation uses the SCSS module (\`index.module.scss\`) and theme tokens.

          ## 💡 Usage Examples

          ### Basic usage
          \`\`\`tsx
          <label htmlFor="user-email">Email</label>
          <TextField id="user-email" name="email" type="email" placeholder="you@example.com" />
          \`\`\`

          ### Named by existing text (\`aria-labelledby\`)
          \`\`\`tsx
          <span id="pwd-label">Password</span>
          <TextField
            type="password"
            name="password"
            aria-labelledby="pwd-label"
            autoComplete="current-password"
          />
          \`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(28rem, 80vw)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    "aria-label": "Default text field",
  },
};

export const WithIcon: Story = {
  args: {
    type: "search",
    icon: "search",
    placeholder: "Search posts",
    "aria-label": "Search posts",
  },
  parameters: {
    docs: {
      description: {
        story:
          "TextField with a decorative leading Feather icon inside the input boundary.",
      },
    },
  },
};

export const OutlinedVariant: Story = {
  args: {
    variant: "outlined",
    "aria-label": "Outlined text field",
  },
  parameters: {
    controls: {
      exclude: ["variant"],
    },
    docs: {
      description: {
        story: "Outlined TextField variant with a full input boundary.",
      },
    },
  },
};

export const UnderlinedVariant: Story = {
  args: {
    variant: "underlined",
    "aria-label": "Underlined text field",
  },
  parameters: {
    controls: {
      exclude: ["variant"],
    },
    docs: {
      description: {
        story: "Underlined TextField variant with only the lower boundary visible.",
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    value: "Read-only value",
    readOnly: true,
    "aria-label": "Read-only text field",
  },
  parameters: {
    controls: {
      exclude: ["readOnly"],
    },
  },
};

export const SizeVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {textFieldSizes.map((size) => (
        <TextField
          {...args}
          key={size}
          aria-label={`${size} text field`}
          placeholder={`${size} text field`}
          size={size}
        />
      ))}
    </div>
  ),
  parameters: {
    controls: {
      exclude: ["size"],
    },
    viewMode: "docs",
  },
};

export const Disabled: Story = {
  args: {
    value: "Disabled value",
    disabled: true,
    "aria-label": "Disabled text field",
  },
  parameters: {
    controls: {
      exclude: ["disabled"],
    },
  },
};

export const Invalid: Story = {
  args: {
    value: "Needs review",
    "aria-label": "Invalid text field",
    "aria-invalid": "true",
  },
  parameters: {
    controls: {
      exclude: ["aria-invalid"],
    },
  },
};
