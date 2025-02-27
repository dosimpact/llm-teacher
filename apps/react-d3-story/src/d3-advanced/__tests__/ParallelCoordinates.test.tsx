import { render } from "@testing-library/react";
import { ParallelCoordinates } from "../ParallelCoordinates";

describe("ParallelCoordinates", () => {
  const mockData = [
    { id: "1", group: "A", dim1: 10, dim2: 20, dim3: 30, dim4: 40 },
    { id: "2", group: "A", dim1: 15, dim2: 25, dim3: 35, dim4: 45 },
    { id: "3", group: "B", dim1: 20, dim2: 30, dim3: 40, dim4: 50 },
    { id: "4", group: "B", dim1: 25, dim2: 35, dim3: 45, dim4: 55 },
    { id: "5", group: "C", dim1: 30, dim2: 40, dim3: 50, dim4: 60 },
  ];

  const dimensions = ["dim1", "dim2", "dim3", "dim4"];

  it("renders without crashing", () => {
    render(<ParallelCoordinates data={mockData} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom dimensions", () => {
    const width = 1000;
    const height = 800;
    render(
      <ParallelCoordinates
        data={mockData}
        dimensions={dimensions}
        width={width}
        height={height}
      />
    );
    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", width.toString());
    expect(svgElement).toHaveAttribute("height", height.toString());
  });

  it("renders with custom margin", () => {
    const margin = { top: 30, right: 40, bottom: 40, left: 50 };
    render(<ParallelCoordinates data={mockData} margin={margin} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom line opacity", () => {
    render(<ParallelCoordinates data={mockData} lineOpacity={0.8} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom axis label rotation", () => {
    render(<ParallelCoordinates data={mockData} axisLabelRotation={-45} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom colors", () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff"];
    render(<ParallelCoordinates data={mockData} colors={colors} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
