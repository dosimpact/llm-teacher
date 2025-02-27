import { render, fireEvent, screen } from "@testing-library/react";
import { ForceGraph } from "../ForceGraph";

const mockData = {
  nodes: [
    { id: "1", group: "A", value: 10 },
    { id: "2", group: "A", value: 20 },
    { id: "3", group: "B", value: 30 },
  ],
  links: [
    { source: "1", target: "2", value: 1 },
    { source: "2", target: "3", value: 2 },
  ],
};

describe("ForceGraph", () => {
  it("renders without crashing", () => {
    render(<ForceGraph data={mockData} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders correct number of nodes and links", () => {
    const { container } = render(<ForceGraph data={mockData} />);
    expect(container.querySelectorAll("circle")).toHaveLength(
      mockData.nodes.length
    );
    expect(container.querySelectorAll("line")).toHaveLength(
      mockData.links.length
    );
  });

  it("calls onNodeClick when a node is clicked", () => {
    const onNodeClick = jest.fn();
    const { container } = render(
      <ForceGraph data={mockData} onNodeClick={onNodeClick} />
    );

    const firstNode = container.querySelector("circle");
    if (firstNode) {
      fireEvent.click(firstNode);
      expect(onNodeClick).toHaveBeenCalledWith("1");
    }
  });

  it("updates when data changes", () => {
    const { container, rerender } = render(<ForceGraph data={mockData} />);
    const initialNodes = container.querySelectorAll("circle").length;

    const newData = {
      nodes: [...mockData.nodes, { id: "4", group: "B", value: 40 }],
      links: [...mockData.links, { source: "3", target: "4", value: 1 }],
    };

    rerender(<ForceGraph data={newData} />);
    const updatedNodes = container.querySelectorAll("circle").length;
    expect(updatedNodes).toBe(initialNodes + 1);
  });

  it("applies custom styles and className", () => {
    const customStyle = { border: "1px solid black" };
    const customClass = "custom-graph";

    const { container } = render(
      <ForceGraph data={mockData} style={customStyle} className={customClass} />
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveClass(customClass);
    expect(svg).toHaveStyle(customStyle);
  });

  it("applies custom node radius", () => {
    const nodeRadius = 10;
    const { container } = render(
      <ForceGraph data={mockData} nodeRadius={nodeRadius} />
    );

    const nodes = container.querySelectorAll("circle");
    nodes.forEach((node) => {
      expect(node).toHaveAttribute("r", nodeRadius.toString());
    });
  });
});
