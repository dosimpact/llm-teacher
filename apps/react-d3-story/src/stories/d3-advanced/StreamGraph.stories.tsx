import type { Meta, StoryObj } from "@storybook/react";
import { StreamGraph } from "../../d3-advanced/StreamGraph";

const meta = {
  title: "D3 Advanced/StreamGraph",
  component: StreamGraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StreamGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateData = (days: number) => {
  const data = [];
  const startDate = new Date("2024-01-01");

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    data.push({
      date,
      category1: Math.random() * 50 + 10,
      category2: Math.random() * 40 + 20,
      category3: Math.random() * 30 + 15,
      category4: Math.random() * 45 + 5,
      category5: Math.random() * 35 + 25,
    });
  }

  return data;
};

export const Default: Story = {
  args: {
    data: generateData(30),
  },
};

export const CustomStyle: Story = {
  args: {
    data: generateData(30),
    width: 1000,
    height: 500,
    margin: { top: 30, right: 40, bottom: 40, left: 50 },
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
  },
};

export const SmallDataset: Story = {
  args: {
    data: generateData(7),
    width: 600,
    height: 300,
  },
};

export const LargeDataset: Story = {
  args: {
    data: generateData(90),
    width: 1200,
    height: 600,
  },
};
