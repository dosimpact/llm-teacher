export interface Node extends d3.SimulationNodeDatum {
  id: string;
  group?: number;
  x?: number;
  y?: number;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value?: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}
