import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./index";

const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    docs: {
      story: {
        autoplay: true,
        inline: false,
      },
    },
    layout: "padded",
  },
  argTypes: {
    placement: {
      control: "select",
    },
    alignment: {
      control: "select",
    },
  },
  tags: ["autodocs"],
  play: async () => {
    new window.TooltipManager();
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    triggerId: "basic-tooltip",
    triggerType: "click",
    placement: "top",
    alignment: "center",
  },
  render: (args) => (
    <Tooltip {...args}>
      <Tooltip.Container>
        <button id={args.triggerId} type="button">
          Trigger
        </button>
        <Tooltip.Content>This is description.</Tooltip.Content>
      </Tooltip.Container>
    </Tooltip>
  ),
};

// export const DifferentPlacements: Story = {
//   render: () => (
//     <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
//       {["top", "right", "bottom", "left"].map((placement) => (
//         <Tooltip key={placement}>
//           <Tooltip.Container>
//             <button type="button">{placement}</button>
//           </Tooltip.Container>
//           <Tooltip.Content
//             triggerId={`tooltip-${placement}`}
//             triggerType="hover"
//             placement={placement}
//             alignment="center"
//           >
//             {`${placement} 위치의 툴팁입니다`}
//           </Tooltip.Content>
//         </Tooltip>
//       ))}
//     </div>
//   ),
// };

// export const DifferentAlignments: Story = {
//   render: () => (
//     <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
//       {["start", "center", "end"].map((alignment) => (
//         <Tooltip key={alignment}>
//           <Tooltip.Container>
//             <button type="button">{alignment}</button>
//           </Tooltip.Container>
//           <Tooltip.Content
//             triggerId={`tooltip-${alignment}`}
//             triggerType="hover"
//             placement="top"
//             alignment={alignment}
//           >
//             {`${alignment} 정렬된 툴팁입니다`}
//           </Tooltip.Content>
//         </Tooltip>
//       ))}
//     </div>
//   ),
// };
