import type { Meta, StoryObj } from "@storybook/react";
import { ParallelCoordinates } from "../../d3-advanced/ParallelCoordinates";

const meta = {
  title: "D3 Advanced/ParallelCoordinates",
  component: ParallelCoordinates,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ParallelCoordinates>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateRandomData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i + 1}`,
    group: `Group ${Math.floor(i / 5) + 1}`,
    dimension1: Math.random() * 100,
    dimension2: Math.random() * 100,
    dimension3: Math.random() * 100,
    dimension4: Math.random() * 100,
    dimension5: Math.random() * 100,
  }));
};

export const Default: Story = {
  args: {
    data: [
      {
        id: "1",
        group: "A",
        performance: 85,
        reliability: 90,
        usability: 75,
        maintainability: 80,
        efficiency: 88,
      },
      {
        id: "2",
        group: "A",
        performance: 78,
        reliability: 85,
        usability: 82,
        maintainability: 75,
        efficiency: 80,
      },
      {
        id: "3",
        group: "B",
        performance: 92,
        reliability: 78,
        usability: 88,
        maintainability: 85,
        efficiency: 75,
      },
      {
        id: "4",
        group: "B",
        performance: 70,
        reliability: 95,
        usability: 70,
        maintainability: 90,
        efficiency: 85,
      },
      {
        id: "5",
        group: "C",
        performance: 88,
        reliability: 82,
        usability: 85,
        maintainability: 78,
        efficiency: 92,
      },
    ],
    dimensions: [
      "performance",
      "reliability",
      "usability",
      "maintainability",
      "efficiency",
    ],
  },
};

export const CustomStyle: Story = {
  args: {
    ...Default.args,
    width: 1000,
    height: 600,
    margin: { top: 40, right: 60, bottom: 40, left: 60 },
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c"],
    lineOpacity: 0.7,
    axisLabelRotation: -30,
  },
};

export const LargeDataset: Story = {
  args: {
    data: generateRandomData(30),
    dimensions: [
      "dimension1",
      "dimension2",
      "dimension3",
      "dimension4",
      "dimension5",
    ],
    width: 1200,
    height: 800,
    lineOpacity: 0.4,
  },
};

export const SmallDataset: Story = {
  args: {
    data: generateRandomData(8),
    dimensions: ["dimension1", "dimension2", "dimension3"],
    width: 600,
    height: 400,
    lineOpacity: 0.8,
  },
};

export const VerticalLabels: Story = {
  args: {
    ...Default.args,
    axisLabelRotation: -90,
  },
};
