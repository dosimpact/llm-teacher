import type { Meta, StoryObj } from "@storybook/react";
import { ForceGraph } from "../../d3-advanced/ForceGraph";

const meta = {
  title: "D3 Advanced/ForceGraph",
  component: ForceGraph,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ForceGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터
const sampleData = {
  nodes: [
    { id: "A", group: "group1", value: 20 },
    { id: "B", group: "group1", value: 15 },
    { id: "C", group: "group2", value: 25 },
    { id: "D", group: "group2", value: 18 },
    { id: "E", group: "group3", value: 22 },
    { id: "F", group: "group3", value: 30 },
  ],
  links: [
    { source: "A", target: "B", value: 5 },
    { source: "B", target: "C", value: 3 },
    { source: "C", target: "D", value: 7 },
    { source: "D", target: "E", value: 4 },
    { source: "E", target: "F", value: 6 },
    { source: "F", target: "A", value: 2 },
    { source: "A", target: "D", value: 8 },
    { source: "B", target: "E", value: 3 },
    { source: "C", target: "F", value: 5 },
  ],
};

export const Default: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
  },
};

export const CustomStyling: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    nodeRadius: 8,
    linkStrength: 0.5,
    chargeStrength: -50,
  },
};

export const WithInteraction: Story = {
  args: {
    data: sampleData,
    width: 600,
    height: 400,
    onNodeClick: (nodeId: string) => {
      alert(`노드 ${nodeId}가 클릭되었습니다!`);
    },
  },
};
