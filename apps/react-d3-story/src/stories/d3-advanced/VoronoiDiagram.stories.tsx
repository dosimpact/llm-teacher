import type { Meta, StoryObj } from "@storybook/react";
import { VoronoiDiagram } from "../../d3-advanced/VoronoiDiagram";

const meta = {
  title: "D3 Advanced/VoronoiDiagram",
  component: VoronoiDiagram,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VoronoiDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateRandomPoints = (count: number, width: number, height: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `point-${i + 1}`,
    x: Math.random() * (width - 100) + 50,
    y: Math.random() * (height - 100) + 50,
    label: `Point ${i + 1}`,
    group: `Group ${Math.floor(i / 5) + 1}`,
  }));
};

export const Default: Story = {
  args: {
    data: [
      { id: "1", x: 100, y: 100, label: "Point 1", group: "A" },
      { id: "2", x: 200, y: 100, label: "Point 2", group: "A" },
      { id: "3", x: 150, y: 200, label: "Point 3", group: "B" },
      { id: "4", x: 300, y: 150, label: "Point 4", group: "B" },
      { id: "5", x: 400, y: 200, label: "Point 5", group: "C" },
      { id: "6", x: 350, y: 300, label: "Point 6", group: "C" },
    ],
  },
};

export const CustomStyle: Story = {
  args: {
    data: Default.args.data,
    width: 1000,
    height: 800,
    margin: { top: 30, right: 40, bottom: 40, left: 50 },
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c"],
    pointRadius: 5,
  },
};

export const NoPointsOrLabels: Story = {
  args: {
    data: Default.args.data,
    showPoints: false,
    showLabels: false,
  },
};

export const LargeDataset: Story = {
  args: {
    data: generateRandomPoints(50, 1000, 800),
    width: 1000,
    height: 800,
    pointRadius: 3,
    showLabels: false,
  },
};

export const SmallDataset: Story = {
  args: {
    data: generateRandomPoints(10, 400, 300),
    width: 400,
    height: 300,
    pointRadius: 4,
  },
};
