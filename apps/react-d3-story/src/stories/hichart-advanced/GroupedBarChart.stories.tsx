import type { Meta, StoryObj } from "@storybook/react";
import { GroupedBarChart } from "../../hichart-advanced/GroupedBarChart";

const meta = {
  title: "Highcharts/Advanced/GroupedBarChart",
  component: GroupedBarChart,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GroupedBarChart>;

export default meta;

// 샘플 데이터 생성 (연도별로 비슷한 패턴을 가지되 약간의 변동성 추가)
const generateTrendData = (baseValues: number[], variance: number = 20) => {
  return baseValues.map((base) => base + (Math.random() - 0.5) * variance);
};

// 기본 트렌드 패턴 (계절성을 가진 데이터)
const basePattern = [
  50, // 1월
  40, // 2월
  60, // 3월
  80, // 4월
  100, // 5월
  90, // 6월
  85, // 7월
  95, // 8월
  120, // 9월
  110, // 10월
  70, // 11월
  80, // 12월
];

const yearlyData = [
  {
    year: 2020,
    data: generateTrendData(basePattern),
  },
  {
    year: 2021,
    data: generateTrendData(basePattern.map((v) => v * 1.2)), // 20% 증가
  },
  {
    year: 2022,
    data: generateTrendData(basePattern.map((v) => v * 1.4)), // 40% 증가
  },
  {
    year: 2023,
    data: generateTrendData(basePattern.map((v) => v * 1.6)), // 60% 증가
  },
  {
    year: 2024,
    data: generateTrendData(basePattern.map((v) => v * 1.8)), // 80% 증가
  },
];

export const Default: StoryObj<typeof GroupedBarChart> = {
  args: {
    title: "연도별 월간 데이터 비교 (평균 추세선 포함)",
    subtitle: "2020-2024 (연한 배경색으로 평균 추세 영역 표시)",
    yearlyData,
    yAxisTitle: "매출 (백만원)",
  },
};

export const CustomColors: StoryObj<typeof GroupedBarChart> = {
  args: {
    title: "연도별 월간 데이터 비교 (커스텀 색상)",
    subtitle: "2020-2024 (연한 배경색으로 평균 추세 영역 표시)",
    yearlyData: yearlyData.map((data, index) => ({
      ...data,
      color: `hsl(${index * 45}, 70%, 50%)`,
    })),
    yAxisTitle: "매출 (백만원)",
  },
};
