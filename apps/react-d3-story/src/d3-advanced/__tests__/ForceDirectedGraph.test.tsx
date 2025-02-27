import { render, screen } from "@testing-library/react";
import { ForceDirectedGraph } from "../ForceDirectedGraph";

describe("ForceDirectedGraph", () => {
  const mockData = {
    nodes: [{ id: "1" }, { id: "2" }, { id: "3" }],
    links: [
      { source: "1", target: "2", value: 1 },
      { source: "2", target: "3", value: 2 },
    ],
  };

  it("renders without crashing", () => {
    render(<ForceDirectedGraph data={mockData} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom dimensions", () => {
    const width = 800;
    const height = 600;
    render(
      <ForceDirectedGraph data={mockData} width={width} height={height} />
    );
    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", width.toString());
    expect(svgElement).toHaveAttribute("height", height.toString());
  });

  it("renders correct number of nodes and links", () => {
    render(<ForceDirectedGraph data={mockData} />);
    const circles = document.querySelectorAll("circle");
    const lines = document.querySelectorAll("line");
    expect(circles.length).toBe(mockData.nodes.length);
    expect(lines.length).toBe(mockData.links.length);
  });
});
