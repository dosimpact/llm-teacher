import { useEffect, useRef, memo } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

export interface SankeyNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  index?: number;
  x0?: number;
  y0?: number;
  x1?: number;
  y1?: number;
  value?: number;
}

export interface SankeyLink {
  source: string | SankeyNode;
  target: string | SankeyNode;
  value: number;
}

interface SankeyDiagramProps {
  data: {
    nodes: SankeyNode[];
    links: SankeyLink[];
  };
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  nodeWidth?: number;
  nodePadding?: number;
  colors?: string[];
}

export const SankeyDiagram = memo(
  ({
    data,
    width = 800,
    height = 600,
    margin = { top: 20, right: 20, bottom: 20, left: 20 },
    nodeWidth = 20,
    nodePadding = 10,
    colors = d3.schemeSet3,
  }: SankeyDiagramProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current || !data.nodes.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // 노드 ID를 기반으로 인덱스 매핑 생성
      const nodeIds = data.nodes.map((node) => node.id);
      const nodeById = new Map(data.nodes.map((node, i) => [node.id, i]));

      // 링크 데이터 변환
      const links = data.links.map((link) => ({
        ...link,
        source:
          typeof link.source === "string"
            ? nodeById.get(link.source) || 0
            : nodeById.get(link.source.id) || 0,
        target:
          typeof link.target === "string"
            ? nodeById.get(link.target) || 0
            : nodeById.get(link.target.id) || 0,
      }));

      const sankeyGenerator = sankey<SankeyNode, SankeyLink>()
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .extent([
          [margin.left, margin.top],
          [width - margin.right, height - margin.bottom],
        ]);

      const { nodes, links: sankeyLinks } = sankeyGenerator({
        nodes: data.nodes.map((node, i) => ({ ...node, index: i })),
        links,
      });

      const color = d3
        .scaleOrdinal()
        .domain(data.nodes.map((d) => d.name))
        .range(colors);

      // 링크 그리기
      svg
        .append("g")
        .selectAll("path")
        .data(sankeyLinks)
        .join("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("fill", "none")
        .attr(
          "stroke",
          (d) => d3.color(color(d.source.name))?.darker() as string
        )
        .attr("stroke-width", (d) => Math.max(1, d.width || 0))
        .attr("opacity", 0.5);

      // 노드 그리기
      const node = svg
        .append("g")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      node
        .append("rect")
        .attr("height", (d) => (d.y1 || 0) - (d.y0 || 0))
        .attr("width", (d) => (d.x1 || 0) - (d.x0 || 0))
        .attr("fill", (d) => color(d.name) as string)
        .attr("opacity", 0.8);

      // 텍스트 레이블 추가
      node
        .append("text")
        .attr("x", (d) =>
          (d.x0 || 0) < width / 2 ? (d.x1 || 0) - (d.x0 || 0) + 6 : -6
        )
        .attr("y", (d) => ((d.y1 || 0) - (d.y0 || 0)) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", (d) => ((d.x0 || 0) < width / 2 ? "start" : "end"))
        .text((d) => d.name)
        .style("font-size", "10px")
        .style("fill", "#333");

      // 호버 효과
      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("padding", "10px")
        .style("border-radius", "5px");

      node
        .on("mouseover", function (event, d) {
          d3.select(this).select("rect").attr("opacity", 1);
          tooltip
            .style("visibility", "visible")
            .html(`${d.name}<br/>Value: ${d.value}`);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).select("rect").attr("opacity", 0.8);
          tooltip.style("visibility", "hidden");
        });

      return () => {
        tooltip.remove();
      };
    }, [data, width, height, margin, nodeWidth, nodePadding, colors]);

    return <svg ref={svgRef} width={width} height={height} />;
  }
);

SankeyDiagram.displayName = "SankeyDiagram";
