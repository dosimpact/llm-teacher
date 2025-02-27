import type { Meta, StoryObj } from "@storybook/react";
import { CircularPackingChart } from "../../d3-advanced/CircularPackingChart";

const meta = {
  title: "D3 Advanced/CircularPackingChart",
  component: CircularPackingChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CircularPackingChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      name: "Organization",
      children: [
        {
          name: "Engineering",
          children: [
            {
              name: "Frontend",
              children: [
                { name: "React", value: 30 },
                { name: "Vue", value: 20 },
                { name: "Angular", value: 15 },
              ],
            },
            {
              name: "Backend",
              children: [
                { name: "Node.js", value: 25 },
                { name: "Python", value: 20 },
                { name: "Java", value: 15 },
              ],
            },
          ],
        },
        {
          name: "Design",
          children: [
            { name: "UI", value: 20 },
            { name: "UX", value: 15 },
            { name: "Graphics", value: 10 },
          ],
        },
        {
          name: "Marketing",
          children: [
            { name: "Social Media", value: 15 },
            { name: "Content", value: 12 },
            { name: "SEO", value: 8 },
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
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
  },
};

export const SimpleHierarchy: Story = {
  args: {
    data: {
      name: "Root",
      children: [
        {
          name: "Category A",
          children: [
            { name: "Item 1", value: 10 },
            { name: "Item 2", value: 15 },
          ],
        },
        {
          name: "Category B",
          children: [
            { name: "Item 3", value: 20 },
            { name: "Item 4", value: 5 },
          ],
        },
      ],
    },
    width: 600,
    height: 600,
  },
};

export const DeepHierarchy: Story = {
  args: {
    data: {
      name: "Root",
      children: Array.from({ length: 3 }, (_, i) => ({
        name: `Level 1 - ${i + 1}`,
        children: Array.from({ length: 4 }, (_, j) => ({
          name: `Level 2 - ${i + 1}.${j + 1}`,
          children: Array.from({ length: 3 }, (_, k) => ({
            name: `Level 3 - ${i + 1}.${j + 1}.${k + 1}`,
            value: Math.floor(Math.random() * 30) + 5,
          })),
        })),
      })),
    },
    width: 1200,
    height: 1200,
  },
};
