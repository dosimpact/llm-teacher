import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BaseChartProps, MultiSeriesChartProps } from "./types";

export const AreaChart: React.FC<BaseChartProps | MultiSeriesChartProps> = ({
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
      type: "area",
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
      area: {
        fillOpacity: 0.5,
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
