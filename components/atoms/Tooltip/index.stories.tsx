import { useEffect } from "react";
import { useArgs } from "storybook/preview-api";
import { expect, userEvent, waitFor, within } from "storybook/test";
import dedent from "ts-dedent";
import Tooltip from "./index";
import type { TooltipConfig } from "./type";
import type { Meta, StoryObj } from "@storybook/react";

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
          Tooltip component provides an overlay that displays additional information or descriptions for trigger elements.<br>
          It combines a component-based declarative structure with a DOM-based automatic position calculation system.

          ## ✨ Key Features

          ### 📍 Placement & Alignment
          - Automatically detects viewport boundaries and adjusts to an appropriate position
          - Automatically adjusts to the opposite direction when there is insufficient space in the configured position

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

          ## 🏗️ Component Structure

          Tooltip uses a compound component pattern:

          - \`Tooltip\`: Main container component
          - \`Tooltip.Trigger\`: Component that wraps the trigger element for displaying the tooltip
          - \`Tooltip.Content\`: Component that contains the tooltip content

          ## 🎨 Customization

          ### 💅 Styling
          - Provides default styles through CSS modules
          - Theme support through CSS variables (\`--tooltip-bg\`, \`--tooltip-border\`, \`--tooltip-text\`)
          - Additional styling possible through \`className\` prop
          - Modify \`index.module.scss\` file to change global styles

          ### 🎯 Trigger Elements
          - Can use various HTML elements as triggers (buttons, links, input fields, etc.)
          - \`id\` attribute required on trigger element (to uniquely identify each tooltip)

          ### ⚙️ Behavior Control
          - Global tooltip management through \`TooltipManager\` singleton
          - Multiple tooltips can be used simultaneously on the same page
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Mouse hover - Tooltip appears after 200ms when hovering over trigger",
      async () => {
        const trigger = canvas.getByRole("button", { name: /trigger/i });
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        // Initially hidden
        expect(tooltip).toHaveAttribute("hidden");

        // Hover over trigger
        await userEvent.hover(trigger);

        // Wait for show delay (200ms)
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
          },
          { timeout: 300 },
        );
      },
    );

    await step(
      "Mouse hover - Tooltip remains visible when moving between trigger and tooltip",
      async () => {
        const trigger = canvas.getByRole("button", { name: /trigger/i });
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        // Move from trigger to tooltip
        await userEvent.unhover(trigger);
        await userEvent.hover(tooltip);

        // Tooltip should still be visible
        await waitFor(() => {
          expect(tooltip).not.toHaveAttribute("hidden");
        });
      },
    );

    await step(
      "Mouse hover - Tooltip hides after 100ms when leaving the area",
      async () => {
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        // Move away from tooltip
        await userEvent.unhover(tooltip);

        // Wait for hide delay (100ms) + transition (200ms)
        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: 400 },
        );
      },
    );

    await step(
      "Keyboard focus - Tooltip appears immediately when focusing with Tab",
      async () => {
        const trigger = canvas.getByRole("button", { name: /trigger/i });
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        // Focus trigger
        await userEvent.tab();
        expect(trigger).toHaveFocus();

        // Tooltip should be visible immediately
        await waitFor(() => {
          expect(tooltip).not.toHaveAttribute("hidden");
        });
      },
    );

    await step(
      "Keyboard focus - Tooltip disappears when pressing Escape key",
      async () => {
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        // Press Escape
        await userEvent.keyboard("{Escape}");

        // Tooltip should be hidden
        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: 400 },
        );
      },
    );
  },
};

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
        <Tooltip.Content>
          This is a tooltip with a much longer text content to demonstrate how the tooltip
          handles extended descriptions and multiple lines of information. The tooltip
          should automatically adjust its width based on the content.
        </Tooltip.Content>
      </Tooltip>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Position calculation - Long text tooltip is displayed within viewport boundaries",
      async () => {
        const trigger = canvas.getByRole("button", { name: /hover for long text/i });
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        await userEvent.hover(trigger);

        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
          },
          { timeout: 300 },
        );

        // Verify tooltip is positioned correctly
        const tooltipRect = tooltip.getBoundingClientRect();
        expect(tooltipRect.top).toBeGreaterThanOrEqual(0);
        expect(tooltipRect.left).toBeGreaterThanOrEqual(0);
        expect(tooltipRect.right).toBeLessThanOrEqual(window.innerWidth);
        expect(tooltipRect.bottom).toBeLessThanOrEqual(window.innerHeight);
      },
    );

    await step("Animation - Tooltip fades in smoothly", async () => {
      const trigger = canvas.getByRole("button", { name: /hover for long text/i });
      const tooltip = canvas.getByRole("tooltip", { hidden: true });

      // Hide first
      await userEvent.unhover(trigger);
      await waitFor(
        () => {
          expect(tooltip).toHaveAttribute("hidden");
        },
        { timeout: 400 },
      );

      // Show again
      await userEvent.hover(trigger);

      await waitFor(
        () => {
          expect(tooltip).not.toHaveAttribute("hidden");
          // Check opacity transition
          const opacity = window.getComputedStyle(tooltip).opacity;
          expect(parseFloat(opacity)).toBeGreaterThan(0);
        },
        { timeout: 300 },
      );
    });
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Mouse hover - Mouse hover works on various trigger elements",
      async () => {
        const buttonTrigger = canvas.getByRole("button", { name: /button trigger/i });
        const linkTrigger = canvas.getByRole("link", { name: /link trigger/i });
        const inputTrigger = canvas.getByPlaceholderText(/input trigger/i);

        await userEvent.hover(buttonTrigger);
        await waitFor(
          () => {
            const tooltip1 = canvas.getByText("Tooltip on button");
            expect(tooltip1).not.toHaveAttribute("hidden");
          },
          { timeout: 300 },
        );

        await userEvent.hover(linkTrigger);
        await waitFor(
          () => {
            const tooltip2 = canvas.getByText("Tooltip on link");
            expect(tooltip2).not.toHaveAttribute("hidden");
          },
          { timeout: 300 },
        );

        await userEvent.hover(inputTrigger);
        await waitFor(
          () => {
            const tooltip3 = canvas.getByText("Tooltip on input field");
            expect(tooltip3).not.toHaveAttribute("hidden");
          },
          { timeout: 300 },
        );
      },
    );

    await step(
      "Keyboard focus - Keyboard focus works on various trigger elements",
      async () => {
        // Test button trigger
        const buttonTrigger = canvas.getByRole("button", { name: /button trigger/i });
        const buttonTooltip = canvas.getByText("Tooltip on button");

        buttonTrigger.focus();
        expect(buttonTrigger).toHaveFocus();

        await waitFor(
          () => {
            expect(buttonTooltip).not.toHaveAttribute("hidden");
          },
          { timeout: 500 },
        );

        // Test link trigger
        const linkTrigger = canvas.getByRole("link", { name: /link trigger/i });
        const linkTooltip = canvas.getByText("Tooltip on link");

        linkTrigger.focus();
        expect(linkTrigger).toHaveFocus();

        await waitFor(
          () => {
            expect(linkTooltip).not.toHaveAttribute("hidden");
          },
          { timeout: 500 },
        );

        // Test input trigger
        const inputTrigger = canvas.getByPlaceholderText(/input trigger/i);
        const inputTooltip = canvas.getByText("Tooltip on input field");

        inputTrigger.focus();
        expect(inputTrigger).toHaveFocus();

        await waitFor(
          () => {
            expect(inputTooltip).not.toHaveAttribute("hidden");
          },
          { timeout: 500 },
        );
      },
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Position calculation - Various placement and alignment combinations work",
      async () => {
        const trigger1 = canvas.getByRole("button", { name: /tooltip 1/i });
        const trigger2 = canvas.getByRole("button", { name: /tooltip 2/i });
        const trigger3 = canvas.getByRole("button", { name: /tooltip 3/i });
        const trigger4 = canvas.getByRole("button", { name: /tooltip 4/i });

        // Test top placement
        await userEvent.hover(trigger1);
        await waitFor(
          () => {
            const tooltip1 = canvas.getByText("First tooltip");
            expect(tooltip1).not.toHaveAttribute("hidden");
          },
          { timeout: 300 },
        );

        // Test bottom placement
        await userEvent.hover(trigger2);
        await waitFor(
          () => {
            const tooltip2 = canvas.getByText("Second tooltip with different placement");
            expect(tooltip2).not.toHaveAttribute("hidden");
          },
          { timeout: 300 },
        );

        // Test left placement
        await userEvent.hover(trigger3);
        await waitFor(
          () => {
            const tooltip3 = canvas.getByText("Third tooltip");
            expect(tooltip3).not.toHaveAttribute("hidden");
          },
          { timeout: 300 },
        );

        // Test right placement
        await userEvent.hover(trigger4);
        await waitFor(
          () => {
            const tooltip4 = canvas.getByText("Fourth tooltip");
            expect(tooltip4).not.toHaveAttribute("hidden");
          },
          { timeout: 300 },
        );
      },
    );

    await step("Mouse hover - Only one tooltip is activated at a time", async () => {
      const trigger1 = canvas.getByRole("button", { name: /tooltip 1/i });
      const trigger2 = canvas.getByRole("button", { name: /tooltip 2/i });

      // Show first tooltip
      await userEvent.hover(trigger1);
      await waitFor(
        () => {
          const tooltip1 = canvas.getByText("First tooltip");
          expect(tooltip1).not.toHaveAttribute("hidden");
        },
        { timeout: 300 },
      );

      // Hover second trigger - first should be hidden
      await userEvent.hover(trigger2);
      await waitFor(
        () => {
          const tooltip1 = canvas.getByText("First tooltip");
          expect(tooltip1).toHaveAttribute("hidden");
          const tooltip2 = canvas.getByText("Second tooltip with different placement");
          expect(tooltip2).not.toHaveAttribute("hidden");
        },
        { timeout: 400 },
      );
    });
  },
};
