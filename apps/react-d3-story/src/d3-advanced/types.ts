export interface Dimension {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface ChartProps extends Partial<Dimension> {
  className?: string;
  style?: React.CSSProperties;
}

export interface DataPoint {
  id: string;
  value: number;
  date?: Date;
  category?: string;
  group?: string;
  x?: number;
  y?: number;
  z?: number;
  size?: number;
  color?: string;
  children?: DataPoint[];
  parent?: string;
}

export interface HierarchyNode {
  id: string;
  name: string;
  value?: number;
  children?: HierarchyNode[];
}

export interface NetworkNode {
  id: string;
  group: string;
  value: number;
}

export interface NetworkLink {
  source: string;
  target: string;
  value: number;
}

export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export interface GeoFeature {
  type: string;
  properties: {
    name: string;
    value: number;
  };
  geometry: {
    type: string;
    coordinates: number[][];
  };
}

export interface StreamData {
  date: Date;
  [key: string]: Date | number;
}
