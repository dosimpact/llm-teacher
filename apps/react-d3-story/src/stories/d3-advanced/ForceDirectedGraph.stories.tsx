import type { Meta, StoryObj } from "@storybook/react";
import { ForceDirectedGraph } from "../../d3-advanced/ForceDirectedGraph";

const meta = {
  title: "D3 Advanced/ForceDirectedGraph",
  component: ForceDirectedGraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ForceDirectedGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      nodes: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }, { id: "E" }],
      links: [
        { source: "A", target: "B", value: 1 },
        { source: "B", target: "C", value: 2 },
        { source: "C", target: "D", value: 1 },
        { source: "D", target: "E", value: 3 },
        { source: "E", target: "A", value: 2 },
      ],
    },
  },
};

export const CustomStyle: Story = {
  args: {
    ...Default.args,
    width: 800,
    height: 600,
    nodeRadius: 8,
    linkDistance: 150,
    charge: -50,
  },
};

export const LargeDataset: Story = {
  args: {
    data: {
      nodes: Array.from({ length: 20 }, (_, i) => ({
        id: String.fromCharCode(65 + i),
      })),
      links: Array.from({ length: 30 }, (_, i) => ({
        source: String.fromCharCode(65 + Math.floor(Math.random() * 20)),
        target: String.fromCharCode(65 + Math.floor(Math.random() * 20)),
        value: Math.floor(Math.random() * 5) + 1,
      })),
    },
    width: 1000,
    height: 800,
  },
};
