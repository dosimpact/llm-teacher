import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { LineData, ChartDimension } from "../types/chart";

interface LineChartProps extends ChartDimension {
  data: LineData[];
  color?: string;
  showPoints?: boolean;
}

export const LineChart = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  color = "steelblue",
  showPoints = true,
}: LineChartProps) => {
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
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([innerHeight, 0]);

    const line = d3
      .line<LineData>()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add the line path
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add points if showPoints is true
    if (showPoints) {
      g.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (d) => x(d.date))
        .attr("cy", (d) => y(d.value))
        .attr("r", 4)
        .attr("fill", color);
    }

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    g.append("g").call(d3.axisLeft(y));
  }, [data, width, height, margin, color, showPoints]);

  return <svg ref={svgRef} />;
};
