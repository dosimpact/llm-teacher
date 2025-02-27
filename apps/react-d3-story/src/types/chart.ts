export interface ChartData {
  label: string;
  value: number;
}

export interface ChartDimension {
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface PieData {
  label: string;
  value: number;
}

export interface LineData {
  date: Date;
  value: number;
}

export interface MultiLineData {
  date: Date;
  group: string;
  value: number;
}

export interface BubbleData {
  id: string;
  value: number;
  group: string;
  size: number;
}
