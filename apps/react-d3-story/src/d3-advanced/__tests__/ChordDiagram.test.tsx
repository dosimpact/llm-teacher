import { render } from "@testing-library/react";
import { ChordDiagram, ChordData } from "../ChordDiagram";

describe("ChordDiagram", () => {
  const mockData: ChordData = {
    matrix: [
      [11, 58, 89],
      [58, 0, 31],
      [89, 31, 0],
    ],
    names: ["A", "B", "C"],
  };

  it("기본 렌더링이 정상적으로 동작해야 합니다", () => {
    const { container } = render(<ChordDiagram data={mockData} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("사용자 정의 크기로 렌더링되어야 합니다", () => {
    const width = 600;
    const height = 600;
    const { container } = render(
      <ChordDiagram data={mockData} width={width} height={height} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", width.toString());
    expect(svg).toHaveAttribute("height", height.toString());
  });

  it("사용자 정의 여백으로 렌더링되어야 합니다", () => {
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const { container } = render(
      <ChordDiagram data={mockData} margin={margin} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("사용자 정의 색상으로 렌더링되어야 합니다", () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff"];
    const { container } = render(
      <ChordDiagram data={mockData} colors={colors} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("사용자 정의 padAngle로 렌더링되어야 합니다", () => {
    const padAngle = 0.1;
    const { container } = render(
      <ChordDiagram data={mockData} padAngle={padAngle} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("사용자 정의 labelOffset으로 렌더링되어야 합니다", () => {
    const labelOffset = 30;
    const { container } = render(
      <ChordDiagram data={mockData} labelOffset={labelOffset} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
