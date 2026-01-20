import dedent from "ts-dedent";
import Heading from "./index";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Heading> = {
  title: "Atoms/Heading",
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: dedent`
          Renders a semantic heading element (\`<h1>\` through \`<h6>\`) with configurable level and styling.

          Accepts content via the \`children\` prop and supports all standard HTML heading attributes.

          ## ✨ Key Features

          ### ⚙️ Behavior
          - Supports all six heading levels (1-6) through the \`level\` prop
          - Maintains proper document structure and hierarchy

          ### ♿ Accessibility
          - Uses semantic HTML heading elements for proper document structure
          - Supports all standard HTML heading attributes
          - Screen reader compatible
          - Maintains proper heading hierarchy for assistive technologies

          ## 🎨 Customization

          ### 💅 Styling
          - Provides default styles through CSS modules
          - Additional styling possible through \`className\` prop
        `,
      },
    },
  },
  argTypes: {
    level: {
      control: "select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 1,
    children: "Default Heading",
  },
};

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    level: 1,
    children:
      "This is a very long heading text that demonstrates how the component handles longer content",
  },
};

export const WithCustomProps: Story = {
  args: {
    level: 2,
    children: "Heading with custom props",
    id: "custom-heading",
  },
};
