import type { Meta, StoryObj } from "@storybook/react";
import { BubbleChart } from "../../d3-advanced/BubbleChart";

const meta = {
  title: "D3 Advanced/BubbleChart",
  component: BubbleChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BubbleChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { id: "React", value: 100, group: "Frontend", label: "React" },
      { id: "Vue", value: 80, group: "Frontend", label: "Vue.js" },
      { id: "Angular", value: 70, group: "Frontend", label: "Angular" },
      { id: "Node", value: 90, group: "Backend", label: "Node.js" },
      { id: "Python", value: 85, group: "Backend", label: "Python" },
      { id: "Java", value: 75, group: "Backend", label: "Java" },
      { id: "PostgreSQL", value: 65, group: "Database", label: "PostgreSQL" },
      { id: "MongoDB", value: 60, group: "Database", label: "MongoDB" },
      { id: "Redis", value: 40, group: "Database", label: "Redis" },
    ],
  },
};

export const CustomStyle: Story = {
  args: {
    ...Default.args,
    width: 1000,
    height: 800,
    margin: { top: 30, right: 40, bottom: 40, left: 50 },
    minRadius: 20,
    maxRadius: 80,
    strength: -50,
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c"],
  },
};

export const SmallDataset: Story = {
  args: {
    data: [
      { id: "A", value: 50, label: "Item A" },
      { id: "B", value: 30, label: "Item B" },
      { id: "C", value: 20, label: "Item C" },
    ],
    width: 400,
    height: 300,
    minRadius: 15,
    maxRadius: 40,
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 30 }, (_, i) => ({
      id: `item-${i + 1}`,
      value: Math.floor(Math.random() * 90) + 10,
      group: `Group ${Math.floor(i / 10) + 1}`,
      label: `Item ${i + 1}`,
    })),
    width: 1200,
    height: 800,
    minRadius: 10,
    maxRadius: 60,
    strength: -20,
  },
};
