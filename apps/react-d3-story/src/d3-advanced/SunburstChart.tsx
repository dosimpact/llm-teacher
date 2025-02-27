import { useEffect, useRef, memo } from "react";
import * as d3 from "d3";

export interface SunburstNode {
  name: string;
  value?: number;
  children?: SunburstNode[];
}

interface SunburstChartProps {
  data: SunburstNode;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
  cornerRadius?: number;
  padAngle?: number;
}

export const SunburstChart = memo(
  ({
    data,
    width = 800,
    height = 800,
    margin = { top: 20, right: 20, bottom: 20, left: 20 },
    colors = d3.schemeSet3,
    cornerRadius = 3,
    padAngle = 0.01,
  }: SunburstChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const radius =
        Math.min(
          width - margin.left - margin.right,
          height - margin.top - margin.bottom
        ) / 2;

      // 계층 구조 데이터 생성
      const root = d3
        .hierarchy(data)
        .sum((d) => d.value || 0)
        .sort((a, b) => (b.value || 0) - (a.value || 0));

      // 파티션 레이아웃 생성
      const partition = d3
        .partition<SunburstNode>()
        .size([2 * Math.PI, radius]);

      const arc = d3
        .arc<d3.HierarchyRectangularNode<SunburstNode>>()
        .startAngle((d) => d.x0)
        .endAngle((d) => d.x1)
        .padAngle(padAngle)
        .padRadius(radius / 3)
        .innerRadius((d) => d.y0)
        .outerRadius((d) => d.y1 - 1)
        .cornerRadius(cornerRadius);

      // 색상 스케일 설정
      const color = d3
        .scaleOrdinal()
        .domain(root.descendants().map((d) => d.depth.toString()))
        .range(colors);

      // 컨테이너 생성
      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

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

      // 노드 그리기
      const path = g
        .selectAll("path")
        .data(partition(root).descendants())
        .join("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.depth.toString()) as string)
        .attr("opacity", 0.8)
        .style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("opacity", 1);

          const percentage = (
            (100 * (d.value || 0)) /
            (root.value || 1)
          ).toFixed(1);
          tooltip.style("visibility", "visible").html(`
            <strong>${d.data.name}</strong><br/>
            Value: ${d.value}<br/>
            Percentage: ${percentage}%<br/>
            Depth: ${d.depth}
          `);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).attr("opacity", 0.8);
          tooltip.style("visibility", "hidden");
        });

      // 텍스트 레이블 추가
      const text = g
        .selectAll("text")
        .data(partition(root).descendants())
        .join("text")
        .attr("transform", function (d) {
          const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
          const y = (d.y0 + d.y1) / 2;
          return `rotate(${
            x - 90
          }) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "#333")
        .style("pointer-events", "none")
        .text((d) => {
          const arcLength = ((d.x1 - d.x0) * (d.y0 + d.y1)) / 2;
          return arcLength > 30 ? d.data.name : "";
        });

      return () => {
        tooltip.remove();
      };
    }, [data, width, height, margin, colors, cornerRadius, padAngle]);

    return <svg ref={svgRef} width={width} height={height} />;
  }
);

SunburstChart.displayName = "SunburstChart";
