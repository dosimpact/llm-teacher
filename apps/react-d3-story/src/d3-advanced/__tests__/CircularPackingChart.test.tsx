import { render } from "@testing-library/react";
import { CircularPackingChart } from "../CircularPackingChart";

describe("CircularPackingChart", () => {
  const mockData = {
    name: "Root",
    children: [
      {
        name: "Group A",
        children: [
          { name: "Subgroup A1", value: 20 },
          { name: "Subgroup A2", value: 10 },
          { name: "Subgroup A3", value: 30 },
        ],
      },
      {
        name: "Group B",
        children: [
          { name: "Subgroup B1", value: 15 },
          { name: "Subgroup B2", value: 25 },
        ],
      },
      {
        name: "Group C",
        value: 40,
      },
    ],
  };

  it("renders without crashing", () => {
    render(<CircularPackingChart data={mockData} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom dimensions", () => {
    const width = 1000;
    const height = 1000;
    render(
      <CircularPackingChart data={mockData} width={width} height={height} />
    );
    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", width.toString());
    expect(svgElement).toHaveAttribute("height", height.toString());
  });

  it("renders with custom margin", () => {
    const margin = { top: 30, right: 40, bottom: 40, left: 50 };
    render(<CircularPackingChart data={mockData} margin={margin} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom colors", () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#yellow"];
    render(<CircularPackingChart data={mockData} colors={colors} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
