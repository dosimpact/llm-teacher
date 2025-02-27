import { useEffect, useRef, memo } from "react";
import * as d3 from "d3";

export interface HierarchyNode {
  name: string;
  value?: number;
  children?: HierarchyNode[];
}

interface CircularPackingChartProps {
  data: HierarchyNode;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
}

export const CircularPackingChart = memo(
  ({
    data,
    width = 800,
    height = 800,
    margin = { top: 20, right: 20, bottom: 20, left: 20 },
    colors = d3.schemeSet3,
  }: CircularPackingChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // 계층 구조 데이터 생성
      const root = d3
        .hierarchy(data)
        .sum((d) => d.value || 0)
        .sort((a, b) => (b.value || 0) - (a.value || 0));

      // 원형 패킹 레이아웃 생성
      const pack = d3
        .pack()
        .size([
          width - margin.left - margin.right,
          height - margin.top - margin.bottom,
        ])
        .padding(3);

      const packedData = pack(root);

      // 색상 스케일 설정
      const color = d3
        .scaleOrdinal()
        .domain(root.descendants().map((d) => d.depth.toString()))
        .range(colors);

      // 컨테이너 생성
      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

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
      const node = g
        .selectAll("g")
        .data(packedData.descendants())
        .join("g")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

      // 원 그리기
      node
        .append("circle")
        .attr("r", (d) => d.r)
        .attr("fill", (d) => color(d.depth.toString()) as string)
        .attr("fill-opacity", 0.7)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .on("mouseover", function (event, d: any) {
          d3.select(this).attr("fill-opacity", 1);
          tooltip.style("visibility", "visible").html(`
            <strong>${d.data.name}</strong><br/>
            ${d.value ? `Value: ${d.value}` : ""}
            ${d.children ? `<br/>Children: ${d.children.length}` : ""}
          `);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill-opacity", 0.7);
          tooltip.style("visibility", "hidden");
        });

      // 텍스트 레이블 추가
      node
        .append("text")
        .filter((d) => d.r > 20) // 일정 크기 이상인 원에만 텍스트 추가
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .style("font-size", (d) => Math.min(d.r / 3, 12) + "px")
        .style("fill", "#333")
        .text((d) => d.data.name);

      return () => {
        tooltip.remove();
      };
    }, [data, width, height, margin, colors]);

    return <svg ref={svgRef} width={width} height={height} />;
  }
);

CircularPackingChart.displayName = "CircularPackingChart";
