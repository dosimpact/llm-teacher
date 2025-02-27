import { render } from "@testing-library/react";
import { SunburstChart } from "../SunburstChart";

describe("SunburstChart", () => {
  const mockData = {
    name: "Root",
    children: [
      {
        name: "Category A",
        children: [
          { name: "Subcategory A1", value: 20 },
          { name: "Subcategory A2", value: 10 },
          { name: "Subcategory A3", value: 30 },
        ],
      },
      {
        name: "Category B",
        children: [
          { name: "Subcategory B1", value: 15 },
          { name: "Subcategory B2", value: 25 },
        ],
      },
      {
        name: "Category C",
        value: 40,
      },
    ],
  };

  it("renders without crashing", () => {
    render(<SunburstChart data={mockData} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom dimensions", () => {
    const width = 1000;
    const height = 1000;
    render(<SunburstChart data={mockData} width={width} height={height} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", width.toString());
    expect(svgElement).toHaveAttribute("height", height.toString());
  });

  it("renders with custom margin", () => {
    const margin = { top: 30, right: 40, bottom: 40, left: 50 };
    render(<SunburstChart data={mockData} margin={margin} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom corner radius and pad angle", () => {
    render(<SunburstChart data={mockData} cornerRadius={5} padAngle={0.02} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom colors", () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#yellow"];
    render(<SunburstChart data={mockData} colors={colors} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
