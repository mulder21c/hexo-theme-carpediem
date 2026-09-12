import { useEffect, useRef } from "react";
import { expect, waitFor, within } from "storybook/test";
import dedent from "ts-dedent";
import Slider from "./index";
import type { SliderProps } from "./type";
import type { Meta, StoryObj } from "@storybook/react-vite";

function ManagedSlider(props: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current?.firstElementChild;
    const SliderManager = window.SliderManager;
    if (!(root instanceof Element) || SliderManager === undefined) {
      return undefined;
    }
    const manager = new SliderManager(root);
    return () => manager.destroy();
  });

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Slider {...props} />
    </div>
  );
}

const meta: Meta<typeof Slider> = {
  title: "Atoms/Slider",
  component: Slider,
  args: {
    min: 0,
    max: 100,
    value: 40,
    step: 5,
    shiftStep: 10,
    marks: false,
    orientation: "horizontal",
    size: "medium",
    disabled: false,
    name: "volume",
    "aria-label": "Volume",
  },
  argTypes: {
    min: { table: { category: "Behavior" } },
    max: { table: { category: "Behavior" } },
    value: { table: { category: "Behavior" } },
    step: { table: { category: "Behavior" } },
    shiftStep: { table: { category: "Behavior" } },
    marks: { table: { category: "Content" } },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: { category: "Layout" },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      table: { category: "Appearance" },
    },
    disabled: { table: { category: "State" } },
    name: { table: { category: "HTML Attributes" } },
    id: { table: { category: "HTML Attributes" } },
    className: { table: { category: "HTML Attributes" } },
    "aria-label": { table: { category: "HTML Attributes" } },
    "aria-labelledby": { table: { category: "HTML Attributes" } },
  },
  parameters: {
    docs: {
      description: {
        component: dedent`
          Slider renders one native \`<input type="range">\` as a static SSR form control and delegates browser interaction to an explicitly created \`SliderManager\` from \`slider.ui.ts\`.

          Pass range props (\`min\`, \`max\`, \`value\`, \`step\`, \`shiftStep\`, \`marks\`) plus naming (\`aria-label\` or \`aria-labelledby\`). Do not pass React \`onChange\` handlers—wire adapters or DOM events through the manager.

          ## ✨ Key Features

          ### ⚙️ Behavior
          - Supports exact numeric steps, automatic marks, custom guidance marks, and restricted mark values (\`step={null}\` with custom marks)
          - Keeps the native input, ARIA state, form payload, visual thumb, and notifications on one normalized value
          - Treats \`value\` as the immutable SSR and form-reset baseline rather than a controlled React value
          - Requires an explicit \`new SliderManager(target, options?)\`; the UI bundle never auto-scans or creates a default instance

          ### 🖱️ Interactions
          - Accepts rail, thumb, and mark-label pointer input with root-owned pointer capture
          - Supports Arrow, Page Up/Down, Home, and End keys through the canonical input
          - Dispatches bubbling \`slider:change\` and \`slider:commit\` events after successful synchronization
          - Optional \`onChange\` / \`onChangeCommitted\` adapters receive the same normalized \`number\`

          ### ♿ Accessibility
          - Uses one native range input for focus, keyboard, form, and slider semantics
          - Requires \`aria-label\` or \`aria-labelledby\`
          - Provides visible focus, forced-colors, reduced-motion, disabled, and vertical presentation

          ## 🎨 Customization

          ### 💅 Styling
          - Provides small, medium, and large sizes through CSS Modules
          - Uses theme-owned \`--slider-*\` semantic color variables
          - Fills horizontal space; vertical examples must provide an explicit parent height

          ## ⚠️ Notes
          - Production SSR markup is not hydrated; consumers initialize and destroy the manager explicitly
          - Mark labels are never truncated, so consumers must reserve enough space for long content and overflow
          - Large valid mark collections are rendered completely without virtualization
          - After \`destroy()\`, create a new manager instance—reusing a destroyed instance throws

          ## 💡 Usage Examples

          ### Client script (\`slider.ui.ts\` / \`window.SliderManager\`)
          Load the production UI bundle so \`window.SliderManager\` is available, then construct one manager per root and tear it down with \`destroy()\`.

          Target forms: a root \`Element\`, an element \`id\` (optionally \`#\`-prefixed), or the default selector \`[data-component="slider"]\` when exactly one Slider exists on the page.

          \`\`\`ts
          const manager = new window.SliderManager!("volume-slider", {
            onChangeCommitted(value) {
              console.log("changing", value);
            },
          });

          // After reparenting into a different form while live:
          // manager.refreshFormAssociation();

          manager.destroy();
          \`\`\`

          ### \`SliderManagerOptions\`
          Pass an options object (or omit it). \`null\` / primitives are rejected with \`ADAPTER\` / \`options\` before initialization. Callbacks are snapshotted once at construction and must be plain functions when provided.

          | Option | Type | When it runs |
          | --- | --- | --- |
          | \`onChange\` | \`(value: number) => void\` | After each successful actual value change, immediately after \`slider:change\` |
          | \`onChangeCommitted\` | \`(value: number) => void\` | After a commit, immediately after \`slider:commit\` |

          Adapter details:
          - Argument is the same normalized \`number\` used for the input, ARIA, visuals, and custom events
          - Called with no \`this\` binding; return values, Promises, and thenables are ignored
          - A thrown adapter stops later notification steps in that sequence but leaves an otherwise live manager live
          - Omitted adapters skip only that step; DOM events still dispatch when applicable

          ### Custom events
          Listen on the Slider root. Both events bubble, are non-cancelable, and expose \`detail.value\` as a normalized \`number\`.

          | Event | Plain-language meaning | \`CustomEvent\` init |
          | --- | --- | --- |
          | \`slider:change\` | Value updated | \`{ bubbles: true, cancelable: false, detail: { value } }\` |
          | \`slider:commit\` | Current gesture finished | \`{ bubbles: true, cancelable: false, detail: { value } }\` |

          Applicable notification order after synchronization:

          \`\`\`text
          slider:change dispatch
          → onChange
          → slider:commit dispatch
          → onChangeCommitted
          \`\`\`

          \`\`\`ts
          const root = document.getElementById("volume-slider");

          // Live preview while dragging
          root?.addEventListener("slider:change", (event) => {
            if (event instanceof CustomEvent) {
              console.log("preview", event.detail.value);
            }
          });

          // Persist only after the user releases the thumb
          root?.addEventListener("slider:commit", (event) => {
            if (event instanceof CustomEvent) {
              console.log("save", event.detail.value);
            }
          });
          \`\`\`

          Native range \`input\` / \`change\` events remain browser-owned. The manager does not synthesize, cancel, redispatch, or promise a cross-order between them and \`slider:*\` notifications.

          ### Choosing \`change\` vs \`commit\`
          Think of a drag as many tiny updates, then one “done”:

          - **\`change\` / \`onChange\`** — “the value moved.” Fires every time the number actually changes while the user is still interacting (dragging or pressing keys). Use this for cheap, local UI feedback: live preview labels, CSS variables, unmuted audio volume while scrubbing.
          - **\`commit\` / \`onChangeCommitted\`** — “the user finished this gesture.” Fires once when the interaction settles. Use this for work you do **not** want on every intermediate thumb position: persist settings, call an API, write \`localStorage\`, sync a remote preference.

          Most consumers only need \`change\`. Add \`commit\` when intermediate updates would be too noisy or expensive.

          Concrete timing:
          - **Pointer drag**: \`change\` on each moved value; \`commit\` once when the pointer ends (\`pointerup\` / \`pointercancel\` / \`lostpointercapture\` / window \`blur\`)—even if the drag never changed the value
          - **Keyboard** (Arrow / Page / Home / End): a value-changing key fires \`change\` and \`commit\` together in one sequence (each key press is already a finished step)
          - **Form reset**: restores the SSR baseline with **no** adapters and **no** custom events
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(32rem, 90vw)", padding: "3rem 2rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => <ManagedSlider {...args} />,
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("slider", { name: "Volume" });

    await step("Keyboard updates and focuses the canonical input", async () => {
      input.focus();
      await userEvent.keyboard("{ArrowRight}");
      expect(input).toHaveFocus();
      expect(input).toHaveValue("45");
      expect(input).toHaveAttribute("aria-valuenow", "45");
    });

    await step("Pointer input updates through the visual rail", async () => {
      const rail = input.nextElementSibling as HTMLElement;
      const root = rail.parentElement as HTMLElement;
      const rect = rail.getBoundingClientRect();
      expect(rect.width).toBeGreaterThan(0);
      let capturedPointer: number | undefined;
      root.setPointerCapture = (pointerId) => {
        capturedPointer = pointerId;
      };
      root.hasPointerCapture = (pointerId) => capturedPointer === pointerId;
      root.releasePointerCapture = () => {
        capturedPointer = undefined;
      };
      const pointer = new MouseEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        button: 0,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + 1,
      });
      Object.defineProperties(pointer, {
        pointerId: { value: 1 },
        isPrimary: { value: true },
      });
      rail.dispatchEvent(pointer);
      root.dispatchEvent(
        Object.assign(new MouseEvent("pointerup", { bubbles: true }), { pointerId: 1 }),
      );
      expect(input).toHaveValue("50");
    });
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2.5rem" }}>
      <ManagedSlider {...args} size="small" aria-label="Small Slider" />
      <ManagedSlider {...args} size="medium" aria-label="Medium Slider" />
      <ManagedSlider {...args} size="large" aria-label="Large Slider" />
    </div>
  ),
  parameters: {
    controls: { exclude: ["size"] },
    viewMode: "docs",
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div style={{ height: "20rem", width: "3rem" }}>
      <ManagedSlider {...args} orientation="vertical" aria-label="Vertical Slider" />
    </div>
  ),
  parameters: { controls: { exclude: ["orientation"] } },
};

export const Marks: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "4rem" }}>
      <ManagedSlider {...args} marks aria-label="Automatic marks" />
      <ManagedSlider
        {...args}
        marks={[
          { value: 0, label: "Mute" },
          { value: 50, label: "Balanced" },
          { value: 100, label: "Maximum" },
        ]}
        aria-label="Custom marks"
      />
      <ManagedSlider
        {...args}
        step={null}
        value={50}
        marks={[
          { value: 0, label: "Low" },
          { value: 50, label: "Medium" },
          { value: 100, label: "High" },
        ]}
        aria-label="Restricted marks"
      />
      <div
        style={{
          display: "flex",
          gap: "6rem",
          alignItems: "stretch",
          height: "20rem",
        }}
      >
        <div style={{ height: "100%", width: "3rem" }}>
          <ManagedSlider
            {...args}
            orientation="vertical"
            marks
            aria-label="Vertical automatic marks"
          />
        </div>
        <div style={{ height: "100%", minWidth: "8rem" }}>
          <ManagedSlider
            {...args}
            orientation="vertical"
            marks={[
              { value: 0, label: "Mute" },
              { value: 50, label: "Balanced" },
              { value: 100, label: "Maximum" },
            ]}
            aria-label="Vertical custom marks"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { exclude: ["marks", "step", "orientation"] },
    viewMode: "docs",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Mark labels participate in cross-axis layout", () => {
      const horizontalInput = canvas.getByRole("slider", { name: "Custom marks" });
      const verticalInput = canvas.getByRole("slider", { name: "Vertical custom marks" });
      const horizontalRoot = horizontalInput.parentElement;
      const verticalRoot = verticalInput.parentElement;
      const horizontalRail = horizontalInput.nextElementSibling;
      const verticalRail = verticalInput.nextElementSibling;

      if (
        !(horizontalRoot instanceof HTMLElement) ||
        !(verticalRoot instanceof HTMLElement) ||
        !(horizontalRail instanceof HTMLElement) ||
        !(verticalRail instanceof HTMLElement)
      ) {
        throw new Error("Expected Slider roots and rails");
      }

      const horizontalLabels = Array.from(horizontalRail.children)
        .map((mark) => mark.firstElementChild)
        .filter((label): label is HTMLElement => label instanceof HTMLElement);
      const verticalLabels = Array.from(verticalRail.children)
        .map((mark) => mark.firstElementChild)
        .filter((label): label is HTMLElement => label instanceof HTMLElement);
      const horizontalRootRect = horizontalRoot.getBoundingClientRect();
      const verticalRootRect = verticalRoot.getBoundingClientRect();
      const horizontalHitSize = Number.parseFloat(
        getComputedStyle(horizontalRoot).getPropertyValue("--slider-hit-size"),
      );
      const verticalHitSize = Number.parseFloat(
        getComputedStyle(verticalRoot).getPropertyValue("--slider-hit-size"),
      );

      expect(horizontalLabels).toHaveLength(3);
      expect(verticalLabels).toHaveLength(3);
      expect(horizontalRootRect.height).toBeGreaterThan(horizontalHitSize);
      expect(verticalRootRect.width).toBeGreaterThan(verticalHitSize);
      horizontalLabels.forEach((label) => {
        expect(getComputedStyle(label.parentElement as HTMLElement).position).toBe(
          "static",
        );
        expect(getComputedStyle(label).position).toBe("static");
        expect(label.getBoundingClientRect().bottom).toBeLessThanOrEqual(
          horizontalRootRect.bottom + 1,
        );
      });
      verticalLabels.forEach((label) => {
        expect(getComputedStyle(label.parentElement as HTMLElement).position).toBe(
          "static",
        );
        expect(getComputedStyle(label).position).toBe("static");
        expect(label.getBoundingClientRect().right).toBeLessThanOrEqual(
          verticalRootRect.right + 1,
        );
      });
    });
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <ManagedSlider {...args} />,
  play: async ({ canvasElement, userEvent }) => {
    const input = within(canvasElement).getByRole("slider", { name: "Volume" });
    await userEvent.keyboard("{End}");
    expect(input).toBeDisabled();
    expect(input).toHaveValue("40");
  },
};

export const LongLabels: Story = {
  args: {
    marks: [
      { value: 0, label: "A long minimum label that remains fully visible" },
      { value: 100, label: "A long maximum label that may need consumer space" },
    ],
  },
  render: (args) => <ManagedSlider {...args} />,
  parameters: { controls: { exclude: ["marks"] }, viewMode: "docs" },
};

export const RTL: Story = {
  render: (args) => (
    <div dir="rtl">
      <ManagedSlider {...args} aria-label="RTL physical-axis Slider" />
    </div>
  ),
  parameters: { viewMode: "docs" },
};

export const AdaptivePresentation: Story = {
  args: { marks: true },
  render: (args) => <ManagedSlider {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Use the Storybook dark-mode, forced-colors, reduced-motion, hover, and focus tools to inspect adaptive presentation.",
      },
    },
    viewMode: "docs",
  },
};

export const FormReset: Story = {
  render: (args) => (
    <form>
      <ManagedSlider {...args} />
      <button type="reset" style={{ marginTop: "2rem" }}>
        Reset value
      </button>
    </form>
  ),
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("slider", { name: "Volume" });
    await step("Change the value", async () => {
      input.focus();
      await userEvent.keyboard("{End}");
      expect(input).toHaveValue("100");
    });
    await step("Reset to the SSR baseline", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Reset value" }));
      await waitFor(() => expect(input).toHaveValue("40"));
    });
  },
};
