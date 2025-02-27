import { render } from "@testing-library/react";
import { StreamGraph } from "../StreamGraph";

describe("StreamGraph", () => {
  const mockData = [
    {
      date: new Date("2024-01-01"),
      category1: 10,
      category2: 20,
      category3: 15,
    },
    {
      date: new Date("2024-01-02"),
      category1: 15,
      category2: 25,
      category3: 10,
    },
    {
      date: new Date("2024-01-03"),
      category1: 20,
      category2: 15,
      category3: 25,
    },
  ];

  it("renders without crashing", () => {
    render(<StreamGraph data={mockData} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom dimensions", () => {
    const width = 1000;
    const height = 500;
    render(<StreamGraph data={mockData} width={width} height={height} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toHaveAttribute("width", width.toString());
    expect(svgElement).toHaveAttribute("height", height.toString());
  });

  it("renders with custom margin", () => {
    const margin = { top: 30, right: 40, bottom: 40, left: 50 };
    render(<StreamGraph data={mockData} margin={margin} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom colors", () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff"];
    render(<StreamGraph data={mockData} colors={colors} />);
    const svgElement = document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
