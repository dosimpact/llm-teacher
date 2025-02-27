import type { Meta, StoryObj } from "@storybook/react";
import { LineChart } from "../../hichart-basic/LineChart";
import { BarChart } from "../../hichart-basic/BarChart";
import { PieChart } from "../../hichart-basic/PieChart";
import { AreaChart } from "../../hichart-basic/AreaChart";

const meta = {
  title: "Highcharts/Basic",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;

// 샘플 데이터
const lineData = [1, 2, 5, 3, 4];
const categories = ["Jan", "Feb", "Mar", "Apr", "May"];

const pieData = [
  { name: "Chrome", y: 70.67 },
  { name: "Edge", y: 14.77 },
  { name: "Firefox", y: 4.86 },
  { name: "Safari", y: 2.63 },
  { name: "Others", y: 7.07 },
];

const multiSeriesData = [
  {
    name: "2023",
    data: [1, 2, 5, 3, 4],
  },
  {
    name: "2024",
    data: [2, 3, 4, 6, 5],
  },
];

export const BasicLine: StoryObj = {
  render: () => (
    <LineChart
      title="Basic Line Chart"
      subtitle="Monthly Average"
      data={lineData}
      categories={categories}
      yAxisTitle="Value"
      xAxisTitle="Month"
    />
  ),
};

export const MultiSeriesLine: StoryObj = {
  render: () => (
    <LineChart
      title="Multi Series Line Chart"
      subtitle="Yearly Comparison"
      series={multiSeriesData}
      categories={categories}
      yAxisTitle="Value"
      xAxisTitle="Month"
    />
  ),
};

export const BasicBar: StoryObj = {
  render: () => (
    <BarChart
      title="Basic Bar Chart"
      subtitle="Monthly Average"
      data={lineData}
      categories={categories}
      yAxisTitle="Value"
      xAxisTitle="Month"
    />
  ),
};

export const MultiSeriesBar: StoryObj = {
  render: () => (
    <BarChart
      title="Multi Series Bar Chart"
      subtitle="Yearly Comparison"
      series={multiSeriesData}
      categories={categories}
      yAxisTitle="Value"
      xAxisTitle="Month"
    />
  ),
};

export const BasicPie: StoryObj = {
  render: () => (
    <PieChart title="Browser Market Share" subtitle="2024" data={pieData} />
  ),
};

export const BasicArea: StoryObj = {
  render: () => (
    <AreaChart
      title="Basic Area Chart"
      subtitle="Monthly Average"
      data={lineData}
      categories={categories}
      yAxisTitle="Value"
      xAxisTitle="Month"
    />
  ),
};

export const MultiSeriesArea: StoryObj = {
  render: () => (
    <AreaChart
      title="Multi Series Area Chart"
      subtitle="Yearly Comparison"
      series={multiSeriesData}
      categories={categories}
      yAxisTitle="Value"
      xAxisTitle="Month"
    />
  ),
};
