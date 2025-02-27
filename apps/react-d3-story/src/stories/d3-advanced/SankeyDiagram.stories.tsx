import type { Meta, StoryObj } from "@storybook/react";
import { SankeyDiagram } from "../../d3-advanced/SankeyDiagram";

const meta = {
  title: "D3 Advanced/SankeyDiagram",
  component: SankeyDiagram,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SankeyDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      nodes: [
        { id: "A", name: "A" },
        { id: "B", name: "B" },
        { id: "C", name: "C" },
        { id: "D", name: "D" },
        { id: "E", name: "E" },
        { id: "F", name: "F" },
      ],
      links: [
        { source: "A", target: "B", value: 20 },
        { source: "A", target: "C", value: 10 },
        { source: "B", target: "D", value: 15 },
        { source: "B", target: "E", value: 25 },
        { source: "C", target: "E", value: 23 },
        { source: "D", target: "F", value: 12 },
        { source: "E", target: "F", value: 18 },
      ],
    },
  },
};

export const CustomStyle: Story = {
  args: {
    data: Default.args.data,
    width: 1000,
    height: 600,
    margin: { top: 30, right: 40, bottom: 40, left: 50 },
    nodeWidth: 30,
    nodePadding: 20,
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  },
};

export const SimpleFlow: Story = {
  args: {
    data: {
      nodes: [
        { id: "Input", name: "Input" },
        { id: "Process", name: "Process" },
        { id: "Output", name: "Output" },
      ],
      links: [
        { source: "Input", target: "Process", value: 10 },
        { source: "Process", target: "Output", value: 10 },
      ],
    },
    width: 600,
    height: 300,
  },
};

export const ComplexFlow: Story = {
  args: {
    data: {
      nodes: [
        { id: "Source1", name: "Source 1" },
        { id: "Source2", name: "Source 2" },
        { id: "Source3", name: "Source 3" },
        { id: "Process1", name: "Process 1" },
        { id: "Process2", name: "Process 2" },
        { id: "Process3", name: "Process 3" },
        { id: "Target1", name: "Target 1" },
        { id: "Target2", name: "Target 2" },
        { id: "Target3", name: "Target 3" },
      ],
      links: [
        // Sources to Processes
        { source: "Source1", target: "Process1", value: 15 },
        { source: "Source1", target: "Process2", value: 10 },
        { source: "Source2", target: "Process2", value: 20 },
        { source: "Source2", target: "Process3", value: 5 },
        { source: "Source3", target: "Process3", value: 25 },
        // Processes to Targets
        { source: "Process1", target: "Target1", value: 12 },
        { source: "Process1", target: "Target2", value: 8 },
        { source: "Process2", target: "Target2", value: 22 },
        { source: "Process3", target: "Target3", value: 20 },
      ],
    },
    width: 1200,
    height: 800,
  },
};
