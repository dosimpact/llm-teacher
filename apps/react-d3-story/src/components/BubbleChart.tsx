import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { BubbleData, ChartDimension } from "../types/chart";

interface BubbleChartProps extends ChartDimension {
  data: BubbleData[];
}

export const BubbleChart = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
}: BubbleChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([innerHeight, 0]);

    const radius = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d) => d.size) || 0])
      .range([4, 40]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add bubbles
    g.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.value))
      .attr("cy", (d) => y(d.value))
      .attr("r", (d) => radius(d.size))
      .attr("fill", (d) => color(d.group))
      .attr("fill-opacity", 0.7)
      .attr("stroke", (d) => d3.rgb(color(d.group)).darker().toString())
      .attr("stroke-width", 1);

    // Add labels
    g.selectAll("text")
      .data(data)
      .join("text")
      .attr("x", (d) => x(d.value))
      .attr("y", (d) => y(d.value))
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => d.id)
      .style("font-size", "12px")
      .style("fill", "#333");

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    g.append("g").call(d3.axisLeft(y));

    // Add legend
    const groups = Array.from(new Set(data.map((d) => d.group)));
    const legend = g
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "start")
      .selectAll("g")
      .data(groups)
      .join("g")
      .attr("transform", (d, i) => `translate(${innerWidth + 10},${i * 20})`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text((d) => d);
  }, [data, width, height, margin]);

  return <svg ref={svgRef} />;
};
