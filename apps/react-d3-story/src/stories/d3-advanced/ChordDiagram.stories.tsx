import type { Meta, StoryObj } from "@storybook/react";
import { ChordDiagram } from "../../d3-advanced/ChordDiagram";

const meta = {
  title: "D3 Advanced/ChordDiagram",
  component: ChordDiagram,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChordDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultData = {
  matrix: [
    [11, 58, 89, 45],
    [58, 0, 31, 75],
    [89, 31, 0, 21],
    [45, 75, 21, 0],
  ],
  names: ["A", "B", "C", "D"],
};

export const Default: Story = {
  args: {
    data: defaultData,
  },
};

export const CustomStyle: Story = {
  args: {
    data: defaultData,
    width: 600,
    height: 600,
    margin: { top: 30, right: 30, bottom: 30, left: 30 },
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00"],
    padAngle: 0.1,
    labelOffset: 30,
  },
};

export const LargeDataset: Story = {
  args: {
    data: {
      matrix: Array.from({ length: 8 }, () =>
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 100))
      ),
      names: ["A", "B", "C", "D", "E", "F", "G", "H"],
    },
  },
};

export const SmallDataset: Story = {
  args: {
    data: {
      matrix: [
        [10, 20],
        [20, 10],
      ],
      names: ["X", "Y"],
    },
  },
};

export const WithGroups: Story = {
  args: {
    data: {
      matrix: defaultData.matrix,
      names: defaultData.names,
      groups: ["Group 1", "Group 1", "Group 2", "Group 2"],
    },
  },
};
