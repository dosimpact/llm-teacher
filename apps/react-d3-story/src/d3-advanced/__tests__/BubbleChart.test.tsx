import { render } from "@testing-library/react";
import { BubbleChart } from "../BubbleChart";

describe("BubbleChart", () => {
  const mockData = [
    { id: "1", value: 100, group: "A", label: "Item 1" },
    { id: "2", value: 70, group: "A", label: "Item 2" },
    { id: "3", value: 40, group: "B", label: "Item 3" },
    { id: "4", value: 30, group: "B", label: "Item 4" },
    { id: "5", value: 60, group: "C", label: "Item 5" },
  ];

  it("renders without crashing", () => {
    render(<BubbleChart data={mockData} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom dimensions", () => {
    const width = 1000;
    const height = 800;
    render(<BubbleChart data={mockData} width={width} height={height} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", width.toString());
    expect(svgElement).toHaveAttribute("height", height.toString());
  });

  it("renders with custom margin", () => {
    const margin = { top: 30, right: 40, bottom: 40, left: 50 };
    render(<BubbleChart data={mockData} margin={margin} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom radius settings", () => {
    render(<BubbleChart data={mockData} minRadius={20} maxRadius={100} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom colors", () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#yellow"];
    render(<BubbleChart data={mockData} colors={colors} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom force strength", () => {
    render(<BubbleChart data={mockData} strength={-50} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
