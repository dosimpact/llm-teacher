export interface SeriesData {
  name: string;
  data:
    | number[]
    | Array<{ name: string; y: number }>
    | Array<[string | number, number]>;
  color?: string;
  type?: string;
}

export interface BaseChartProps {
  title?: string;
  subtitle?: string;
  data?:
    | number[]
    | Array<{ name: string; y: number }>
    | Array<[string | number, number]>;
  categories?: string[];
  yAxisTitle?: string;
  xAxisTitle?: string;
  height?: string | number;
  className?: string;
  series?: SeriesData[];
}

export type ChartData =
  | number[]
  | Array<{ name: string; y: number }>
  | Array<[string | number, number]>;

export interface MultiSeriesChartProps extends Omit<BaseChartProps, "data"> {
  series: SeriesData[];
}
