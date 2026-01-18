import { queryByAttribute } from "@testing-library/dom";
import { useEffect } from "react";
import { useArgs } from "storybook/preview-api";
import { expect, waitFor, within } from "storybook/test";
import dedent from "ts-dedent";
import { SHOW_DELAY, HIDE_DELAY, TRANSITION_DURATION } from "./tooltip.ui";
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
  play: async ({ canvasElement, step, userEvent }) => {
    const canvas = within(canvasElement);

    await step("Initial - Tooltip is hidden", async () => {
      const tooltip = document.querySelector<HTMLElement>('[role="tooltip"]');

      expect(tooltip).toHaveAttribute("hidden");
    });

    await step(
      `Mouse hover - Tooltip appears after ${SHOW_DELAY}ms when hovering over trigger`,
      async () => {
        const trigger = canvas.getByRole("button", { name: /trigger/i });
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        await userEvent.hover(trigger);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            expect(tooltip).toBeInTheDocument();
            expect(tooltip).toHaveTextContent("This is description.");
          },
          { timeout: SHOW_DELAY },
        );
      },
    );

    await step(
      "Mouse hover - Tooltip remains visible when moving between trigger and tooltip",
      async () => {
        const tooltip = canvas.getByRole("tooltip");

        await userEvent.hover(tooltip);
        expect(tooltip).not.toHaveAttribute("hidden");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent("This is description.");
      },
    );

    await step(
      `Mouse hover - Tooltip hides after ${HIDE_DELAY + TRANSITION_DURATION}ms(delay ${
        HIDE_DELAY
      }ms + transition ${TRANSITION_DURATION}ms) when leaving the area`,
      async () => {
        const tooltip = canvas.getByRole("tooltip");

        await userEvent.unhover(tooltip);

        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: HIDE_DELAY + TRANSITION_DURATION },
        );
      },
    );

    await step(
      `Keyboard focus - Tooltip appears immediately when focusing with Tab`,
      async () => {
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        await userEvent.tab();
        expect(tooltip).not.toHaveAttribute("hidden");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent("This is description.");
      },
    );

    await step(
      `Keyboard focus - Tooltip disappears after immediately when pressing Escape key`,
      async () => {
        const trigger = canvas.getByRole("button", { name: /trigger/i });
        const tooltip = canvas.getByRole("tooltip");

        await userEvent.keyboard("{Escape}");
        expect(tooltip).toHaveAttribute("hidden");

        trigger.blur();
      },
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
  play: async ({ canvasElement, step, userEvent }) => {
    const canvas = within(canvasElement);

    await step("Initial - Tooltip is hidden", async () => {
      const tooltip = document.querySelector<HTMLElement>('[role="tooltip"]');

      expect(tooltip).toHaveAttribute("hidden");
    });

    await step(
      `Mouse hover - Tooltip appears after ${SHOW_DELAY}ms when hovering over trigger`,
      async () => {
        const trigger = canvas.getByRole("button", { name: /Hover for long text/i });
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        await userEvent.hover(trigger);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            expect(tooltip).toBeInTheDocument();
            expect(tooltip).toHaveTextContent(longTextContent);
          },
          { timeout: SHOW_DELAY },
        );
      },
    );

    await step(
      "Mouse hover - Tooltip remains visible when moving between trigger and tooltip",
      async () => {
        const tooltip = canvas.getByRole("tooltip");

        await userEvent.hover(tooltip!);
        expect(tooltip).not.toHaveAttribute("hidden");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent(longTextContent);
      },
    );

    await step(
      `Mouse hover - Tooltip hides after ${HIDE_DELAY + TRANSITION_DURATION}ms(delay ${
        HIDE_DELAY
      }ms + transition ${TRANSITION_DURATION}ms) when leaving the area`,
      async () => {
        const tooltip = canvas.getByRole("tooltip");

        await userEvent.unhover(tooltip!);

        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: HIDE_DELAY + TRANSITION_DURATION },
        );
      },
    );

    await step(
      `Keyboard focus - Tooltip appears immediately when focusing with Tab`,
      async () => {
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        await userEvent.tab();
        expect(tooltip).not.toHaveAttribute("hidden");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent(longTextContent);
      },
    );

    await step(
      `Keyboard focus - Tooltip disappears immediately when pressing Escape key`,
      async () => {
        const trigger = canvas.getByRole("button", { name: /Hover for long text/i });
        const tooltip = canvas.getByRole("tooltip");

        await userEvent.keyboard("{Escape}");
        expect(tooltip).toHaveAttribute("hidden");

        trigger.blur();
      },
    );

    await step(
      "Position calculation - Long text tooltip is displayed within viewport boundaries",
      async () => {
        const trigger = canvas.getByRole("button", { name: /hover for long text/i });
        const tooltip = canvas.getByRole("tooltip", { hidden: true });

        await userEvent.hover(trigger);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            expect(tooltip).toBeInTheDocument();

            const tooltipRect = tooltip!.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            expect(tooltipRect.left).toBeGreaterThanOrEqual(0);
            expect(tooltipRect.top).toBeGreaterThanOrEqual(0);
            expect(tooltipRect.right).toBeLessThanOrEqual(viewportWidth);
            expect(tooltipRect.bottom).toBeLessThanOrEqual(viewportHeight);
          },
          { timeout: SHOW_DELAY },
        );
        userEvent.unhover(trigger);
      },
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
  play: async ({ canvasElement, step, userEvent }) => {
    const canvas = within(canvasElement);

    await step("Initial - All tooltips are hidden", async () => {
      const tooltips = canvas.getAllByRole("tooltip", { hidden: true });

      tooltips.forEach((tooltip) => {
        expect(tooltip).toHaveAttribute("hidden");
      });
    });

    await step(
      `Mouse hover - Button trigger: Tooltip appears after ${SHOW_DELAY}ms`,
      async () => {
        const buttonTrigger = canvas.getByRole("button", { name: /Button trigger/i });
        const triggerId = buttonTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.hover(buttonTrigger);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            expect(tooltip).toBeInTheDocument();
            expect(tooltip).toHaveTextContent("Tooltip on button");
          },
          { timeout: SHOW_DELAY },
        );
      },
    );

    await step(
      `Mouse hover - Button trigger: Tooltip hides after ${HIDE_DELAY + TRANSITION_DURATION}ms when leaving`,
      async () => {
        const buttonTrigger = canvas.getByRole("button", { name: /Button trigger/i });
        const triggerId = buttonTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.unhover(tooltip!);
        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: HIDE_DELAY + TRANSITION_DURATION },
        );
      },
    );

    await step(
      `Mouse hover - Link trigger: Tooltip appears after ${SHOW_DELAY}ms`,
      async () => {
        const linkTrigger = canvas.getByRole("link", { name: /Link trigger/i });
        const triggerId = linkTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.hover(linkTrigger);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            expect(tooltip).toBeInTheDocument();
            expect(tooltip).toHaveTextContent("Tooltip on link");
          },
          { timeout: SHOW_DELAY },
        );
      },
    );

    await step(
      `Mouse hover - Link trigger: Tooltip hides after ${HIDE_DELAY + TRANSITION_DURATION}ms when leaving`,
      async () => {
        const linkTrigger = canvas.getByRole("link", { name: /Link trigger/i });
        const triggerId = linkTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.unhover(tooltip!);
        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: HIDE_DELAY + TRANSITION_DURATION },
        );
      },
    );

    await step(
      `Mouse hover - Input trigger: Tooltip appears after ${SHOW_DELAY}ms`,
      async () => {
        const inputTrigger = canvas.getByPlaceholderText(/input trigger/i);
        const triggerId = inputTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.hover(inputTrigger);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            expect(tooltip).toBeInTheDocument();
            expect(tooltip).toHaveTextContent("Tooltip on input field");
          },
          { timeout: SHOW_DELAY },
        );
      },
    );

    await step(
      `Mouse hover - Input trigger: Tooltip hides after ${HIDE_DELAY + TRANSITION_DURATION}ms when leaving`,
      async () => {
        const inputTrigger = canvas.getByPlaceholderText(/input trigger/i);
        const triggerId = inputTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.unhover(tooltip!);
        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: HIDE_DELAY + TRANSITION_DURATION },
        );
      },
    );

    await step(
      "Keyboard focus - Button trigger: Tooltip appears immediately when focusing",
      async () => {
        const buttonTrigger = canvas.getByRole("button", { name: /Button trigger/i });
        const triggerId = buttonTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        buttonTrigger.focus();
        expect(tooltip).not.toHaveAttribute("hidden");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent("Tooltip on button");
      },
    );

    await step(
      "Keyboard focus - Button trigger: Tooltip disappears when pressing Escape key",
      async () => {
        const buttonTrigger = canvas.getByRole("button", { name: /Button trigger/i });
        const triggerId = buttonTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.keyboard("{Escape}");
        expect(tooltip).toHaveAttribute("hidden");
      },
    );

    await step(
      "Keyboard focus - Link trigger: Tooltip appears immediately when focusing",
      async () => {
        const linkTrigger = canvas.getByRole("link", { name: /Link trigger/i });
        const triggerId = linkTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        linkTrigger.focus();
        expect(tooltip).not.toHaveAttribute("hidden");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent("Tooltip on link");
      },
    );

    await step(
      "Keyboard focus - Link trigger: Tooltip disappears when pressing Escape key",
      async () => {
        const linkTrigger = canvas.getByRole("link", { name: /Link trigger/i });
        const triggerId = linkTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.keyboard("{Escape}");
        expect(tooltip).toHaveAttribute("hidden");
      },
    );

    await step(
      "Keyboard focus - Input trigger: Tooltip appears immediately when focusing",
      async () => {
        const inputTrigger = canvas.getByPlaceholderText(/input trigger/i);
        const triggerId = inputTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        inputTrigger.focus();
        expect(tooltip).not.toHaveAttribute("hidden");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent("Tooltip on input field");
      },
    );

    await step(
      "Keyboard focus - Input trigger: Tooltip disappears when pressing Escape key",
      async () => {
        const inputTrigger = canvas.getByPlaceholderText(/input trigger/i);
        const triggerId = inputTrigger.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.keyboard("{Escape}");
        expect(tooltip).toHaveAttribute("hidden");

        inputTrigger.blur();
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
  play: async ({ canvasElement, step, userEvent }) => {
    const canvas = within(canvasElement);

    await step("Initial - All tooltips are hidden", async () => {
      const tooltips = document.querySelectorAll<HTMLElement>('[role="tooltip"]');
      tooltips.forEach((tooltip) => {
        expect(tooltip).toHaveAttribute("hidden");
      });
    });

    await step(
      `Mouse hover - Tooltip 1 (top, center): Appears after ${SHOW_DELAY}ms`,
      async () => {
        const trigger1 = canvas.getByRole("button", { name: /tooltip 1/i });
        const triggerId = trigger1.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.hover(trigger1);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            const triggerRect = trigger1.getBoundingClientRect();
            const tooltipRect = tooltip!.getBoundingClientRect();

            // top placement: tooltip should be above trigger
            expect(tooltipRect.bottom).toBeLessThanOrEqual(triggerRect.top);

            // center alignment: tooltip center should align with trigger center (allow 2px tolerance)
            const triggerCenterX = triggerRect.left + triggerRect.width / 2;
            const tooltipCenterX = tooltipRect.left + tooltipRect.width / 2;
            expect(Math.abs(tooltipCenterX - triggerCenterX)).toBeLessThanOrEqual(2);
          },
          { timeout: SHOW_DELAY },
        );
      },
    );

    await step(
      `Mouse hover - Tooltip 1: Hides after ${HIDE_DELAY + TRANSITION_DURATION}ms when leaving`,
      async () => {
        const tooltip = canvas.getByRole("tooltip", { name: /First tooltip/i });
        await userEvent.unhover(tooltip);
        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: HIDE_DELAY + TRANSITION_DURATION },
        );
      },
    );

    await step(
      `Mouse hover - Tooltip 2 (bottom, start): Appears after ${SHOW_DELAY}ms`,
      async () => {
        const trigger2 = canvas.getByRole("button", { name: /tooltip 2/i });
        const triggerId = trigger2.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.hover(trigger2);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            const triggerRect = trigger2.getBoundingClientRect();
            const tooltipRect = tooltip!.getBoundingClientRect();

            // bottom placement: tooltip should be below trigger
            expect(tooltipRect.top).toBeGreaterThanOrEqual(triggerRect.bottom);

            // start alignment: tooltip left should align with trigger left (allow 2px tolerance)
            expect(Math.abs(tooltipRect.left - triggerRect.left)).toBeLessThanOrEqual(2);
          },
          { timeout: SHOW_DELAY },
        );
      },
    );

    await step(
      `Mouse hover - Tooltip 2: Hides after ${HIDE_DELAY + TRANSITION_DURATION}ms when leaving`,
      async () => {
        const tooltip = canvas.getByRole("tooltip", {
          name: /Second tooltip with different placement/i,
        });
        await userEvent.unhover(tooltip);
        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: HIDE_DELAY + TRANSITION_DURATION },
        );
      },
    );

    await step(
      `Mouse hover - Tooltip 3 (left, center): Appears after ${SHOW_DELAY}ms`,
      async () => {
        const trigger3 = canvas.getByRole("button", { name: /tooltip 3/i });
        const triggerId = trigger3.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.hover(trigger3);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            const triggerRect = trigger3.getBoundingClientRect();
            const tooltipRect = tooltip!.getBoundingClientRect();

            // left placement: tooltip should be to the left of trigger
            expect(tooltipRect.right).toBeLessThanOrEqual(triggerRect.left);

            // center alignment: tooltip center should align with trigger center (allow 2px tolerance)
            const triggerCenterY = triggerRect.top + triggerRect.height / 2;
            const tooltipCenterY = tooltipRect.top + tooltipRect.height / 2;
            expect(Math.abs(tooltipCenterY - triggerCenterY)).toBeLessThanOrEqual(2);
          },
          { timeout: SHOW_DELAY },
        );
      },
    );

    await step(
      `Mouse hover - Tooltip 3: Hides after ${HIDE_DELAY + TRANSITION_DURATION}ms when leaving`,
      async () => {
        const tooltip = canvas.getByRole("tooltip", { name: /Third tooltip/i });
        await userEvent.unhover(tooltip);
        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: HIDE_DELAY + TRANSITION_DURATION },
        );
      },
    );

    await step(
      `Mouse hover - Tooltip 4 (right, end): Appears after ${SHOW_DELAY}ms`,
      async () => {
        const trigger4 = canvas.getByRole("button", { name: /tooltip 4/i });
        const triggerId = trigger4.getAttribute("aria-describedby");
        const tooltip = queryByAttribute("id", canvasElement, triggerId!);

        await userEvent.hover(trigger4);
        await waitFor(
          () => {
            expect(tooltip).not.toHaveAttribute("hidden");
            const triggerRect = trigger4.getBoundingClientRect();
            const tooltipRect = tooltip!.getBoundingClientRect();

            // right placement: tooltip should be to the right of trigger
            expect(tooltipRect.left).toBeGreaterThanOrEqual(triggerRect.right);

            // end alignment: tooltip bottom should align with trigger bottom (allow 2px tolerance)
            expect(Math.abs(tooltipRect.bottom - triggerRect.bottom)).toBeLessThanOrEqual(
              2,
            );
          },
          { timeout: SHOW_DELAY },
        );
      },
    );

    await step(
      `Mouse hover - Tooltip 4: Hides after ${HIDE_DELAY + TRANSITION_DURATION}ms when leaving`,
      async () => {
        const tooltip = canvas.getByRole("tooltip", { name: /Fourth tooltip/i });
        await userEvent.unhover(tooltip);
        await waitFor(
          () => {
            expect(tooltip).toHaveAttribute("hidden");
          },
          { timeout: HIDE_DELAY + TRANSITION_DURATION },
        );
      },
    );
  },
};
