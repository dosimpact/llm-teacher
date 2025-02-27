import { useEffect, useRef, memo } from "react";
import * as d3 from "d3";

export interface VoronoiPoint {
  id: string;
  x: number;
  y: number;
  label?: string;
  group?: string;
}

interface VoronoiDiagramProps {
  data: VoronoiPoint[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
  showPoints?: boolean;
  pointRadius?: number;
  showLabels?: boolean;
}

export const VoronoiDiagram = memo(
  ({
    data,
    width = 800,
    height = 600,
    margin = { top: 20, right: 20, bottom: 20, left: 20 },
    colors = d3.schemeSet3,
    showPoints = true,
    pointRadius = 3,
    showLabels = true,
  }: VoronoiDiagramProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current || !data.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // 색상 스케일 설정
      const groups = Array.from(new Set(data.map((d) => d.group || d.id)));
      const color = d3.scaleOrdinal<string>().domain(groups).range(colors);

      // Voronoi 다이어그램 생성
      const delaunay = d3.Delaunay.from(
        data,
        (d) => d.x,
        (d) => d.y
      );
      const voronoi = delaunay.voronoi([
        margin.left,
        margin.top,
        width - margin.right,
        height - margin.bottom,
      ]);

      // 컨테이너 생성
      const g = svg.append("g");

      // 툴팁 생성
      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("padding", "10px")
        .style("border-radius", "5px")
        .style("font-size", "12px");

      // Voronoi 셀 그리기
      g.selectAll("path")
        .data(data)
        .join("path")
        .attr("d", (_, i) => voronoi.renderCell(i))
        .attr("fill", (d) => color(d.group || d.id))
        .attr("fill-opacity", 0.3)
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill-opacity", 0.5);
          tooltip.style("visibility", "visible").html(`
            ${d.label || d.id}<br/>
            ${d.group ? `Group: ${d.group}` : ""}
          `);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill-opacity", 0.3);
          tooltip.style("visibility", "hidden");
        });

      // 포인트 그리기
      if (showPoints) {
        g.selectAll("circle")
          .data(data)
          .join("circle")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r", pointRadius)
          .attr("fill", (d) => color(d.group || d.id))
          .attr("stroke", "#fff")
          .attr("stroke-width", 1);
      }

      // 레이블 추가
      if (showLabels) {
        g.selectAll("text")
          .data(data)
          .join("text")
          .attr("x", (d) => d.x)
          .attr("y", (d) => d.y - 10)
          .attr("text-anchor", "middle")
          .style("font-size", "10px")
          .style("fill", "#333")
          .text((d) => d.label || d.id);
      }

      return () => {
        tooltip.remove();
      };
    }, [
      data,
      width,
      height,
      margin,
      colors,
      showPoints,
      pointRadius,
      showLabels,
    ]);

    return <svg ref={svgRef} width={width} height={height} />;
  }
);

VoronoiDiagram.displayName = "VoronoiDiagram";
