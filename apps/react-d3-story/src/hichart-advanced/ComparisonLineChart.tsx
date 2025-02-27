import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ComparisonLineChartProps } from "./types";

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
const DEFAULT_COLORS = ["#2f7ed8", "#c42525"];

export const ComparisonLineChart: React.FC<ComparisonLineChartProps> = ({
  title,
  subtitle,
  companies,
  height = 400,
  className,
  yAxisTitle = "매출 (백만원)",
  xAxisTitle = "월",
}) => {
  // 각 회사별 월간 평균 계산
  const companyAverages = companies.map((company) => {
    const monthlyAverages = Array.from({ length: 12 }, (_, monthIndex) => {
      const monthValues = company.yearlyData.map(
        (year) => year.data[monthIndex]
      );
      return (
        Math.round(
          (monthValues.reduce((sum, value) => sum + value, 0) /
            monthValues.length) *
            10
        ) / 10
      );
    });
    return {
      type: "line" as const,
      name: `${company.companyName} (평균)`,
      data: monthlyAverages,
      color: company.color || DEFAULT_COLORS[companies.indexOf(company)],
      lineWidth: 3,
      zIndex: 2,
      marker: {
        enabled: true,
        radius: 5,
      },
    };
  });

  // 연도별 데이터 시리즈 (기본적으로 숨김)
  const yearSeries = companies.flatMap((company) =>
    company.yearlyData.map((yearData) => ({
      type: "line" as const,
      name: `${company.companyName} (${yearData.year}년)`,
      data: yearData.data,
      color: company.color || DEFAULT_COLORS[companies.indexOf(company)],
      linkedTo: `${company.companyName}`, // 범례에서 그룹화
      visible: false,
      opacity: 0.15,
      lineWidth: 1,
      marker: {
        enabled: false,
      },
    }))
  );

  const options: Highcharts.Options = {
    chart: {
      type: "line",
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
      shared: true,
      useHTML: true,
      headerFormat: "<b>{point.key}</b><table>",
      pointFormat:
        '<tr><td style="color: {series.color}">● {series.name}: </td>' +
        '<td style="text-align: right"><b>{point.y:,.1f}</b></td></tr>',
      footerFormat: "</table>",
      positioner: function (labelWidth, labelHeight, point) {
        return {
          x: point.plotX + this.chart.plotLeft - labelWidth / 2,
          y: this.chart.plotTop,
        };
      },
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          symbol: "circle",
        },
        events: {
          mouseOver: function () {
            // 같은 회사의 연도별 데이터 표시
            const companyName = this.name.split(" (")[0];
            this.chart.series.forEach((s) => {
              if (s.name.includes(companyName) && s.name.includes("년")) {
                s.setVisible(true, false);
              }
            });
            this.chart.redraw();
          },
          mouseOut: function () {
            // 연도별 데이터 숨김
            const companyName = this.name.split(" (")[0];
            this.chart.series.forEach((s) => {
              if (s.name.includes(companyName) && s.name.includes("년")) {
                s.setVisible(false, false);
              }
            });
            this.chart.redraw();
          },
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      backgroundColor: "#FFFFFF",
      shadow: true,
    },
    series: [...companyAverages, ...yearSeries],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
