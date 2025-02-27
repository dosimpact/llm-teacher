import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonLineChart } from "../../hichart-advanced/ComparisonLineChart";

const meta = {
  title: "Highcharts/Advanced/ComparisonLineChart",
  component: ComparisonLineChart,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ComparisonLineChart>;

export default meta;

// 샘플 데이터 생성
const generateRandomData = () =>
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000));

const years = [2020, 2021, 2022, 2023, 2024];

const companyData = [
  {
    companyName: "A 쇼핑몰",
    yearlyData: years.map((year) => ({
      year,
      data: generateRandomData(),
    })),
    color: "#2f7ed8",
  },
  {
    companyName: "B 쇼핑몰",
    yearlyData: years.map((year) => ({
      year,
      data: generateRandomData(),
    })),
    color: "#c42525",
  },
];

export const Default: StoryObj<typeof ComparisonLineChart> = {
  args: {
    title: "쇼핑몰 매출 트렌드 비교",
    subtitle: "2020-2024",
    companies: companyData as [
      (typeof companyData)[0],
      (typeof companyData)[1]
    ],
    yAxisTitle: "매출 (백만원)",
  },
};
