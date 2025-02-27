import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GroupedBarChartProps, YearlyData } from "./types";

const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

const DEFAULT_COLORS = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9"];
const AVERAGE_LINE_COLOR = "#FF9999";
const AVERAGE_AREA_COLOR = "rgba(255, 153, 153, 0.1)";

export const GroupedBarChart: React.FC<GroupedBarChartProps> = ({
  title,
  subtitle,
  yearlyData,
  height = 400,
  className,
  yAxisTitle = "값",
  xAxisTitle = "월",
}) => {
  const series = yearlyData.map((yearData: YearlyData, index: number) => ({
    type: "column" as const,
    name: `${yearData.year}년`,
    data: yearData.data,
    color: yearData.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  const monthlyAverages = Array.from({ length: 12 }, (_, monthIndex) => {
    const monthValues = yearlyData.map((year) => year.data[monthIndex]);
    const average =
      monthValues.reduce((sum, value) => sum + value, 0) / monthValues.length;
    return Math.round(average * 10) / 10;
  });

  const averageSeries = {
    type: "area" as const,
    name: "월별 평균",
    data: monthlyAverages,
    color: AVERAGE_LINE_COLOR,
    fillColor: AVERAGE_AREA_COLOR,
    fillOpacity: 1,
    lineWidth: 2,
    marker: {
      enabled: true,
      radius: 4,
    },
    zIndex: 1,
  };

  const options: Highcharts.Options = {
    chart: {
      type: "column",
      height,
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      categories: MONTHS,
      title: {
        text: xAxisTitle,
      },
      crosshair: true,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
    },
    tooltip: {
      headerFormat: "<b>{point.key}</b><table>",
      pointFormat:
        '<tr><td style="color: {series.color}">● {series.name}: </td>' +
        '<td style="text-align: right"><b>{point.y:,.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        groupPadding: 0.1,
      },
      area: {
        fillOpacity: 0.1,
        lineWidth: 2,
        marker: {
          enabled: true,
          radius: 4,
        },
        states: {
          hover: {
            lineWidth: 2,
          },
        },
      },
      series: {
        states: {
          inactive: {
            opacity: 1,
          },
        },
      },
    },
    series: [...series, averageSeries],
    credits: {
      enabled: false,
    },
    legend: {
      backgroundColor: "#FFFFFF",
      shadow: true,
    },
  };

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
