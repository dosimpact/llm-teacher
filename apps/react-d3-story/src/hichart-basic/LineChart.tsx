import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BaseChartProps, MultiSeriesChartProps } from "./types";

export const LineChart: React.FC<BaseChartProps | MultiSeriesChartProps> = ({
  title,
  subtitle,
  data,
  series,
  categories,
  yAxisTitle,
  xAxisTitle,
  height = 400,
  className,
}) => {
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
      categories,
      title: {
        text: xAxisTitle,
      },
    },
    yAxis: {
      title: {
        text: yAxisTitle,
      },
    },
    series: series
      ? series
      : [
          {
            name: "Data",
            data: data as any,
          },
        ],
    credits: {
      enabled: false,
    },
    plotOptions: {
      line: {
        marker: {
          enabled: true,
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
