import { render } from "@testing-library/react";
import { SankeyDiagram } from "../SankeyDiagram";

describe("SankeyDiagram", () => {
  const mockData = {
    nodes: [{ name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }],
    links: [
      { source: "A", target: "B", value: 5 },
      { source: "B", target: "C", value: 3 },
      { source: "C", target: "D", value: 8 },
      { source: "A", target: "D", value: 2 },
    ],
  };

  it("renders without crashing", () => {
    render(<SankeyDiagram data={mockData} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom dimensions", () => {
    const width = 1000;
    const height = 500;
    render(<SankeyDiagram data={mockData} width={width} height={height} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", width.toString());
    expect(svgElement).toHaveAttribute("height", height.toString());
  });

  it("renders with custom margin", () => {
    const margin = { top: 30, right: 40, bottom: 40, left: 50 };
    render(<SankeyDiagram data={mockData} margin={margin} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom node dimensions", () => {
    const nodeWidth = 30;
    const nodePadding = 20;
    render(
      <SankeyDiagram
        data={mockData}
        nodeWidth={nodeWidth}
        nodePadding={nodePadding}
      />
    );
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom colors", () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#yellow"];
    render(<SankeyDiagram data={mockData} colors={colors} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
