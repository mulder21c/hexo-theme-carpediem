import { useEffect } from "react";
import { useArgs } from "storybook/preview-api";
import { expect, waitFor, within } from "storybook/test";
import dedent from "ts-dedent";
import { HIDE_DELAY, SHOW_DELAY, TRANSITION_DURATION } from "./tooltip.ui";
import Tooltip from "./index";
import type { TooltipConfig } from "./type";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  argTypes: {
    placement: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
    alignment: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
    triggerId: {
      table: {
        category: "Behavior",
      },
    },
  },
  args: {
    triggerId: "basic-tooltip",
    placement: "top",
    alignment: "center",
  },
  parameters: {
    docs: {
      description: {
        component: dedent`
          Tooltip component provides an overlay that displays additional information or descriptions for trigger elements. <br>
          It combines a component-based declarative structure with a DOM-based automatic position calculation system.

          ## ✨ Key Features

          ### ⚙️ Behavior
          - Automatically detects viewport boundaries and adjusts to an appropriate position
          - Automatically adjusts to the opposite direction when there is insufficient space in the configured position
          - Uses a compound component pattern (\`Tooltip\`, \`Tooltip.Trigger\`, \`Tooltip.Content\`)
          - Global tooltip management through \`TooltipManager\` singleton
          - Multiple tooltips can be used simultaneously on the same page

          ### 🖱️ Interactions
          - Mouse hover: Displays after 200ms delay when hovering over the trigger element
          - Focus: Automatically displays on focus during keyboard navigation
          - Touch devices: Displays with a 500ms long press
          - Close tooltip with Escape key
          - Automatically hides on scroll or viewport size changes

          ### ♿ Accessibility
          - Automatic ARIA attribute configuration (\`aria-describedby\`, \`role="tooltip"\`)
          - Keyboard navigation support
          - Screen reader compatible

          ## 🎨 Customization

          ### 💅 Styling
          - Provides default styles through CSS modules
          - Theme support through CSS variables
          - Additional styling possible through \`className\` prop

          ### 🎯 Trigger Elements
          - Can use various HTML elements or components as triggers
          - \`id\` attribute required on trigger element (to uniquely identify each tooltip)
        `,
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "70px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: function (args) {
    const [options] = useArgs<TooltipConfig>();

    useEffect(() => {
      if (window?.tooltip) {
        window.tooltip.destroy();

        const tooltip = document.querySelector<HTMLElement>(`[role="tooltip"]`);
        tooltip?.setAttribute("data-placement", options.placement);
        tooltip?.setAttribute("data-alignment", options.alignment);

        window.tooltip = new window.TooltipManager();
      } else {
        window.tooltip = new window.TooltipManager();
      }

      return () => {
        window.tooltip.destroy();
      };
    }, [options.placement, options.alignment]);

    return (
      <Tooltip {...options}>
        <Tooltip.Trigger>
          <button id={args.triggerId} type="button">
            Trigger
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>This is description.</Tooltip.Content>
      </Tooltip>
    );
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: "Trigger" });
    await userEvent.hover(trigger);

    await waitFor(
      () => {
        const tooltip = canvas.getByRole("tooltip");
        expect(tooltip.hidden).toBe(false);
      },
      { timeout: SHOW_DELAY + 150 },
    );

    await userEvent.unhover(trigger);

    await waitFor(
      () => {
        const tooltip = canvas.getByRole("tooltip", { hidden: true });
        expect(tooltip.hidden).toBe(true);
      },
      { timeout: HIDE_DELAY + TRANSITION_DURATION + 150 },
    );

    trigger.focus();

    await waitFor(
      () => {
        const tooltip = canvas.getByRole("tooltip");
        expect(tooltip.hidden).toBe(false);
      },
      { timeout: 150 },
    );

    await userEvent.keyboard("{Escape}");

    await waitFor(
      () => {
        const tooltip = canvas.getByRole("tooltip", { hidden: true });
        expect(tooltip.hidden).toBe(true);
      },
      { timeout: 200 },
    );
  },
};

const longTextContent =
  "This is a tooltip with a much longer text content to demonstrate how the tooltip handles extended descriptions and multiple lines of information.";

export const WithLongText: Story = {
  args: {
    triggerId: "tooltip-long-text",
    placement: "top",
    alignment: "center",
  },
  parameters: {
    docs: {
      description: {
        story: "Tooltip with long text content to test text wrapping and width handling",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: "50px" }}>
        <Story />
      </div>
    ),
  ],
  render: function (args) {
    const [options] = useArgs<TooltipConfig>();

    useEffect(() => {
      if (window?.tooltip) {
        window.tooltip.destroy();

        const tooltip = document.querySelector<HTMLElement>(`[role="tooltip"]`);
        tooltip?.setAttribute("data-placement", options.placement);
        tooltip?.setAttribute("data-alignment", options.alignment);

        window.tooltip = new window.TooltipManager();
      } else {
        window.tooltip = new window.TooltipManager();
      }

      return () => {
        window.tooltip.destroy();
      };
    }, [options.placement, options.alignment]);

    return (
      <Tooltip {...args}>
        <Tooltip.Trigger>
          <button id={args.triggerId} type="button">
            Hover for long text
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>{longTextContent}</Tooltip.Content>
      </Tooltip>
    );
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Hover for long text" });

    await userEvent.hover(trigger);

    await waitFor(
      () => {
        expect(canvas.getByText(/much longer text content/i)).toBeVisible();
      },
      { timeout: SHOW_DELAY + 150 },
    );
  },
};

export const WithDifferentTriggers: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tooltip with different trigger element types: button, link, span, input",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}
      >
        <Story />
      </div>
    ),
  ],
  render: function () {
    const [options] = useArgs<TooltipConfig>();

    useEffect(() => {
      if (window?.tooltip) {
        window.tooltip.destroy();

        const tooltip = document.querySelector<HTMLElement>(`[role="tooltip"]`);
        tooltip?.setAttribute("data-placement", options.placement);
        tooltip?.setAttribute("data-alignment", options.alignment);

        window.tooltip = new window.TooltipManager();
      } else {
        window.tooltip = new window.TooltipManager();
      }

      return () => {
        window.tooltip.destroy();
      };
    }, [options.placement, options.alignment]);

    return (
      <>
        <Tooltip triggerId="tooltip-button" placement="top" alignment="center">
          <Tooltip.Trigger>
            <button id="tooltip-button" type="button">
              Button trigger
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip on button</Tooltip.Content>
        </Tooltip>

        <Tooltip triggerId="tooltip-link" placement="top" alignment="center">
          <Tooltip.Trigger>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a id="tooltip-link" href="#" target="_blank">
              Link trigger
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip on link</Tooltip.Content>
        </Tooltip>

        <Tooltip triggerId="tooltip-input" placement="top" alignment="center">
          <Tooltip.Trigger>
            <input
              id="tooltip-input"
              type="text"
              placeholder="Input trigger"
              style={{ padding: "8px" }}
            />
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip on input field</Tooltip.Content>
        </Tooltip>
      </>
    );
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const buttonTrigger = canvas.getByRole("button", { name: "Button trigger" });
    await userEvent.hover(buttonTrigger);

    await waitFor(
      () => {
        expect(canvas.getByText("Tooltip on button")).toBeVisible();
      },
      { timeout: SHOW_DELAY + 150 },
    );

    await userEvent.unhover(buttonTrigger);

    await waitFor(
      () => {
        expect(canvas.getByText("Tooltip on button")).not.toBeVisible();
      },
      { timeout: HIDE_DELAY + TRANSITION_DURATION + 150 },
    );

    const inputTrigger = canvas.getByPlaceholderText("Input trigger");
    await userEvent.click(inputTrigger);

    await waitFor(
      () => {
        expect(canvas.getByText("Tooltip on input field")).toBeVisible();
      },
      { timeout: 150 },
    );
  },
};

export const MultipleTooltips: Story = {
  parameters: {
    docs: {
      description: {
        story: "Multiple tooltips on the same page with different configurations",
      },
    },
  },
  render: function () {
    const [options] = useArgs<TooltipConfig>();

    useEffect(() => {
      if (window?.tooltip) {
        window.tooltip.destroy();

        const tooltip = document.querySelector<HTMLElement>(`[role="tooltip"]`);
        tooltip?.setAttribute("data-placement", options.placement);
        tooltip?.setAttribute("data-alignment", options.alignment);

        window.tooltip = new window.TooltipManager();
      } else {
        window.tooltip = new window.TooltipManager();
      }

      return () => {
        window.tooltip.destroy();
      };
    }, [options.placement, options.alignment]);

    return (
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          <Tooltip triggerId="tooltip-multi-1" placement="top" alignment="center">
            <Tooltip.Trigger>
              <button id="tooltip-multi-1" type="button">
                Tooltip 1
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>First tooltip</Tooltip.Content>
          </Tooltip>

          <Tooltip triggerId="tooltip-multi-2" placement="bottom" alignment="start">
            <Tooltip.Trigger>
              <button id="tooltip-multi-2" type="button">
                Tooltip 2
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>Second tooltip with different placement</Tooltip.Content>
          </Tooltip>

          <Tooltip triggerId="tooltip-multi-3" placement="left" alignment="center">
            <Tooltip.Trigger>
              <button id="tooltip-multi-3" type="button">
                Tooltip 3
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>Third tooltip</Tooltip.Content>
          </Tooltip>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <Tooltip triggerId="tooltip-multi-4" placement="right" alignment="end">
            <Tooltip.Trigger>
              <button id="tooltip-multi-4" type="button">
                Tooltip 4
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>Fourth tooltip</Tooltip.Content>
          </Tooltip>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("button", { name: "Tooltip 1" });

    await userEvent.hover(first);

    await waitFor(
      () => {
        expect(canvas.getByText("First tooltip")).toBeVisible();
      },
      { timeout: SHOW_DELAY + 150 },
    );

    await userEvent.unhover(first);
  },
};
