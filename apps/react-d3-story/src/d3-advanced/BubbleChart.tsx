import { useEffect, useRef, memo } from "react";
import * as d3 from "d3";

export interface BubbleData {
  id: string;
  value: number;
  group?: string;
  label?: string;
}

interface BubbleChartProps {
  data: BubbleData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
  minRadius?: number;
  maxRadius?: number;
  strength?: number;
}

export const BubbleChart = memo(
  ({
    data,
    width = 800,
    height = 600,
    margin = { top: 20, right: 20, bottom: 20, left: 20 },
    colors = d3.schemeSet3,
    minRadius = 10,
    maxRadius = 50,
    strength = -30,
  }: BubbleChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current || !data.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // 색상 스케일 설정
      const groups = Array.from(new Set(data.map((d) => d.group || d.id)));
      const color = d3.scaleOrdinal<string>().domain(groups).range(colors);

      // 반지름 스케일 설정
      const radiusScale = d3
        .scaleSqrt()
        .domain([
          d3.min(data, (d) => d.value) || 0,
          d3.max(data, (d) => d.value) || 0,
        ])
        .range([minRadius, maxRadius]);

      // 시뮬레이션 설정
      const simulation = d3
        .forceSimulation(data)
        .force(
          "x",
          d3.forceX((width - margin.left - margin.right) / 2).strength(0.05)
        )
        .force(
          "y",
          d3.forceY((height - margin.top - margin.bottom) / 2).strength(0.05)
        )
        .force(
          "collide",
          d3.forceCollide<BubbleData>().radius((d) => radiusScale(d.value))
        )
        .force("charge", d3.forceManyBody().strength(strength));

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

      // 버블 그리기
      const node = g
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("class", "bubble-node");

      // 원 그리기
      node
        .append("circle")
        .attr("r", (d) => radiusScale(d.value))
        .attr("fill", (d) => color(d.group || d.id))
        .attr("fill-opacity", 0.7)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill-opacity", 1);
          tooltip.style("visibility", "visible").html(`
            ${d.label || d.id}<br/>
            Value: ${d.value}<br/>
            ${d.group ? `Group: ${d.group}` : ""}
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

      // 레이블 추가
      node
        .append("text")
        .text((d) => d.label || d.id)
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .style(
          "font-size",
          (d) =>
            Math.min(
              (2 * radiusScale(d.value)) / (d.label || d.id).length,
              12
            ) + "px"
        )
        .style("fill", "#333")
        .style("pointer-events", "none");

      // 시뮬레이션 업데이트
      simulation.on("tick", () => {
        node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
      });

      return () => {
        simulation.stop();
        tooltip.remove();
      };
    }, [data, width, height, margin, colors, minRadius, maxRadius, strength]);

    return <svg ref={svgRef} width={width} height={height} />;
  }
);

BubbleChart.displayName = "BubbleChart";
