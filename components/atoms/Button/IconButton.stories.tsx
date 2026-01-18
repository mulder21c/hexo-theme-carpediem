import { useEffect } from "react";
import { useArgs } from "storybook/internal/preview-api";
import dedent from "ts-dedent";
import IconButton from "./IconButton";
import type { IconButtonProps } from "./type";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/Button/IconButton",
  component: IconButton,
  argTypes: {
    variant: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
    color: {
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
    stroke: {
      control: "select",
      table: {
        category: "Appearance",
      },
    },
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
    type: {
      control: "select",
      table: {
        category: "Behavior",
      },
    },
    icon: {
      control: "select",
      table: {
        category: "Content",
      },
    },
    label: {
      control: "text",
      table: {
        category: "Content",
      },
    },
  },
  args: {
    size: "medium",
    type: "button",
    variant: "contained",
    color: "primary",
    stroke: "medium",
    icon: "activity",
    placement: "top",
    alignment: "center",
  },
  parameters: {
    docs: {
      description: {
        component: dedent``,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: "20px" }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    label: "Activity",
  },
  render: function (args) {
    const [options] = useArgs<IconButtonProps>();

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
    }, [options.placement, options.alignment]);

    return <IconButton {...args} />;
  },
};

export const Variants: Story = {
  render: function (args) {
    const [options] = useArgs<IconButtonProps>();

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
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <IconButton {...args} variant="contained" label="Contained" />
        <IconButton {...args} variant="outlined" label="Outlined" />
      </div>
    );
  },
  parameters: {
    controls: {
      exclude: ["variant"],
    },
    docs: {
      description: {
        story: "IconButton variant styles: contained and outlined",
      },
    },
    viewMode: "docs",
  },
};

export const Colors: Story = {
  render: function (args) {
    const [options] = useArgs<IconButtonProps>();

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
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <IconButton {...args} color="primary" label="Primary" />
        <IconButton {...args} color="secondary" label="Secondary" />
      </div>
    );
  },
  parameters: {
    controls: {
      exclude: ["color"],
    },
    docs: {
      description: {
        story: "IconButton color schemes: primary and secondary",
      },
    },
    viewMode: "docs",
  },
};

export const Sizes: Story = {
  render: function (args) {
    const [options] = useArgs<IconButtonProps>();

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
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <IconButton {...args} size="small" label="Small" />
        <IconButton {...args} size="medium" label="Medium" />
        <IconButton {...args} size="large" label="Large" />
      </div>
    );
  },
  parameters: {
    controls: {
      exclude: ["size"],
    },
    docs: {
      description: {
        story: "IconButton sizes: small, medium, and large",
      },
    },
    viewMode: "docs",
  },
};

export const Stroke: Story = {
  render: function (args) {
    const [options] = useArgs<IconButtonProps>();

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
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <IconButton {...args} stroke="thin" label="Thin stroke" />
        <IconButton {...args} stroke="medium" label="Medium stroke" />
        <IconButton {...args} stroke="bold" label="Bold stroke" />
      </div>
    );
  },
  parameters: {
    controls: {
      exclude: ["stroke"],
    },
    docs: {
      description: {
        story: "IconButton stroke thickness: thin, medium, and bold",
      },
    },
    viewMode: "docs",
  },
};

export const TooltipPlacements: Story = {
  render: function (args) {
    const [options] = useArgs<IconButtonProps>();

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
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <IconButton
            {...args}
            placement="top"
            alignment="start"
            label="Top start"
            id="tooltip-top-start"
          />
          <IconButton
            {...args}
            placement="top"
            alignment="center"
            label="Top center"
            id="tooltip-top-center"
          />
          <IconButton
            {...args}
            placement="top"
            alignment="end"
            label="Top end"
            id="tooltip-top-end"
          />
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <IconButton
            {...args}
            placement="left"
            alignment="start"
            label="Left start"
            id="tooltip-left-start"
          />
          <IconButton
            {...args}
            placement="left"
            alignment="center"
            label="Left center"
            id="tooltip-left-center"
          />
          <IconButton
            {...args}
            placement="left"
            alignment="end"
            label="Left end"
            id="tooltip-left-end"
          />
          <IconButton
            {...args}
            placement="right"
            alignment="start"
            label="Right start"
            id="tooltip-right-start"
          />
          <IconButton
            {...args}
            placement="right"
            alignment="center"
            label="Right center"
            id="tooltip-right-center"
          />
          <IconButton
            {...args}
            placement="right"
            alignment="end"
            label="Right end"
            id="tooltip-right-end"
          />
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <IconButton
            {...args}
            placement="bottom"
            alignment="start"
            label="Bottom start"
            id="tooltip-bottom-start"
          />
          <IconButton
            {...args}
            placement="bottom"
            alignment="center"
            label="Bottom center"
            id="tooltip-bottom-center"
          />
          <IconButton
            {...args}
            placement="bottom"
            alignment="end"
            label="Bottom end"
            id="tooltip-bottom-end"
          />
        </div>
      </div>
    );
  },
  parameters: {
    controls: {
      exclude: ["placement", "alignment"],
    },
    docs: {
      description: {
        story: "IconButton tooltip placement and alignment combinations",
      },
    },
    viewMode: "docs",
  },
};
