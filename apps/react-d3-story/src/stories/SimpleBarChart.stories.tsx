import type { Meta, StoryObj } from "@storybook/react";
import { SimpleBarChart } from "../components/SimpleBarChart";

const meta = {
  title: "Charts/SimpleBarChart",
  component: SimpleBarChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SimpleBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCustomSize: Story = {
  render: () => (
    <div style={{ width: "600px", height: "400px" }}>
      <SimpleBarChart />
    </div>
  ),
};
