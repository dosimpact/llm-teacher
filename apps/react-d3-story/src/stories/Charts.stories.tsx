import type { Meta, StoryObj } from "@storybook/react";
import { VerticalBarChart } from "../components/VerticalBarChart";
import { HorizontalBarChart } from "../components/HorizontalBarChart";
import { PieChart } from "../components/PieChart";
import { LineChart } from "../components/LineChart";
import { MultiLineChart } from "../components/MultiLineChart";
import { DonutChart } from "../components/DonutChart";
import { BubbleChart } from "../components/BubbleChart";
import { StackedBarChart } from "../components/StackedBarChart";
import { AreaChart } from "../components/AreaChart";
import { RadarChart } from "../components/RadarChart";

// 샘플 데이터
const barData = [
  { label: "월", value: 10 },
  { label: "화", value: 20 },
  { label: "수", value: 15 },
  { label: "목", value: 25 },
  { label: "금", value: 30 },
];

const lineData = [
  { date: new Date("2024-01-01"), value: 10 },
  { date: new Date("2024-01-02"), value: 20 },
  { date: new Date("2024-01-03"), value: 15 },
  { date: new Date("2024-01-04"), value: 25 },
  { date: new Date("2024-01-05"), value: 30 },
];

const multiLineData = [
  { date: new Date("2024-01-01"), group: "A", value: 10 },
  { date: new Date("2024-01-02"), group: "A", value: 20 },
  { date: new Date("2024-01-03"), group: "A", value: 15 },
  { date: new Date("2024-01-01"), group: "B", value: 15 },
  { date: new Date("2024-01-02"), group: "B", value: 25 },
  { date: new Date("2024-01-03"), group: "B", value: 20 },
];

const bubbleData = [
  { id: "A", value: 10, group: "그룹1", size: 20 },
  { id: "B", value: 20, group: "그룹1", size: 40 },
  { id: "C", value: 15, group: "그룹2", size: 30 },
  { id: "D", value: 25, group: "그룹2", size: 50 },
];

const stackedData = [
  { category: "1월", A: 10, B: 20, C: 15 },
  { category: "2월", A: 20, B: 15, C: 25 },
  { category: "3월", A: 15, B: 25, C: 20 },
];

const radarData = [
  { axis: "매출", value: 80 },
  { axis: "이익", value: 60 },
  { axis: "성장률", value: 70 },
  { axis: "고객만족", value: 90 },
  { axis: "시장점유", value: 75 },
];

// 수직 막대 차트
const verticalBarMeta = {
  title: "Charts/VerticalBarChart",
  component: VerticalBarChart,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof VerticalBarChart>;

export default verticalBarMeta;
type Story = StoryObj<typeof verticalBarMeta>;

export const VerticalBar: Story = {
  args: {
    data: barData,
  },
};

// 수평 막대 차트
export const HorizontalBar: Story = {
  render: () => <HorizontalBarChart data={barData} />,
};

// 파이 차트
export const Pie: Story = {
  render: () => <PieChart data={barData} />,
};

// 라인 차트
export const Line: Story = {
  render: () => <LineChart data={lineData} />,
};

// 멀티라인 차트
export const MultiLine: Story = {
  render: () => <MultiLineChart data={multiLineData} />,
};

// 도넛 차트
export const Donut: Story = {
  render: () => <DonutChart data={barData} />,
};

// 버블 차트
export const Bubble: Story = {
  render: () => <BubbleChart data={bubbleData} />,
};

// 스택 바 차트
export const StackedBar: Story = {
  render: () => <StackedBarChart data={stackedData} keys={["A", "B", "C"]} />,
};

// 영역 차트
export const Area: Story = {
  render: () => <AreaChart data={lineData} />,
};

// 레이더 차트
export const Radar: Story = {
  render: () => <RadarChart data={radarData} />,
};
