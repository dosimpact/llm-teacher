import type { Meta, StoryObj } from "@storybook/react";
import { TreemapChart } from "../../d3-advanced/TreemapChart";

const meta = {
  title: "D3 Advanced/TreemapChart",
  component: TreemapChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TreemapChart>;

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
    height: 800,
    margin: { top: 30, right: 40, bottom: 40, left: 50 },
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"],
    padding: 3,
    round: true,
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
    height: 400,
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
    height: 800,
  },
};
