import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ChartData, ChartDimension } from "../types/chart";

interface HorizontalBarChartProps extends ChartDimension {
  data: ChartData[];
  color?: string;
}

export const HorizontalBarChart = ({
  data,
  width = 400,
  height = 300,
  margin = { top: 20, right: 20, bottom: 30, left: 100 },
  color = "steelblue",
}: HorizontalBarChartProps) => {
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

    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerHeight])
      .padding(0.1);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([0, innerWidth]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add bars
    g.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("y", (d) => y(d.label) || 0)
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("width", (d) => x(d.value))
      .attr("fill", color);

    // Add y-axis
    g.append("g").call(d3.axisLeft(y));

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // Add value labels
    g.selectAll(".value-label")
      .data(data)
      .join("text")
      .attr("class", "value-label")
      .attr("x", (d) => x(d.value) + 5)
      .attr("y", (d) => (y(d.label) || 0) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text((d) => d.value);
  }, [data, width, height, margin, color]);

  return <svg ref={svgRef} />;
};
