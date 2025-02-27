import type { Meta, StoryObj } from "@storybook/react";
import { SunburstChart } from "../../d3-advanced/SunburstChart";

const meta = {
  title: "D3 Advanced/SunburstChart",
  component: SunburstChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SunburstChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      name: "File System",
      children: [
        {
          name: "Documents",
          children: [
            {
              name: "Work",
              children: [
                { name: "Reports", value: 500 },
                { name: "Presentations", value: 300 },
                { name: "Spreadsheets", value: 200 },
              ],
            },
            {
              name: "Personal",
              children: [
                { name: "Photos", value: 1000 },
                { name: "Videos", value: 2000 },
                { name: "Music", value: 800 },
              ],
            },
          ],
        },
        {
          name: "Applications",
          children: [
            { name: "Games", value: 3000 },
            { name: "Development", value: 1500 },
            { name: "Utilities", value: 500 },
          ],
        },
        {
          name: "System",
          children: [
            { name: "OS", value: 5000 },
            { name: "Cache", value: 2000 },
            { name: "Temp", value: 1000 },
          ],
        },
      ],
    },
  },
};

export const CustomStyle: Story = {
  args: {
    ...Default.args,
    width: 1000,
    height: 1000,
    margin: { top: 30, right: 40, bottom: 40, left: 50 },
    cornerRadius: 5,
    padAngle: 0.02,
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
  },
};

export const SimpleHierarchy: Story = {
  args: {
    data: {
      name: "Root",
      children: [
        { name: "Category A", value: 20 },
        { name: "Category B", value: 10 },
        { name: "Category C", value: 30 },
        { name: "Category D", value: 15 },
        { name: "Category E", value: 25 },
      ],
    },
    width: 600,
    height: 600,
    cornerRadius: 0,
    padAngle: 0,
  },
};

export const DeepHierarchy: Story = {
  args: {
    data: {
      name: "Root",
      children: Array.from({ length: 5 }, (_, i) => ({
        name: `Level 1 - ${i + 1}`,
        children: Array.from({ length: 4 }, (_, j) => ({
          name: `Level 2 - ${i + 1}.${j + 1}`,
          children: Array.from({ length: 3 }, (_, k) => ({
            name: `Level 3 - ${i + 1}.${j + 1}.${k + 1}`,
            value: Math.floor(Math.random() * 1000) + 100,
          })),
        })),
      })),
    },
    width: 1200,
    height: 1200,
    cornerRadius: 2,
    padAngle: 0.005,
  },
};
