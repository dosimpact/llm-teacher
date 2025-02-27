import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BaseChartProps } from "./types";

export const PieChart: React.FC<BaseChartProps> = ({
  title,
  subtitle,
  data,
  height = 400,
  className,
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      height,
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    series: [
      {
        type: "pie",
        name: "Share",
        data: data as Array<{ name: string; y: number }>,
      },
    ],
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
  };

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
