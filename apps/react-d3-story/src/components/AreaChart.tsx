import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { LineData, ChartDimension } from "../types/chart";

interface AreaChartProps extends ChartDimension {
  data: LineData[];
  color?: string;
  showLine?: boolean;
}

export const AreaChart = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  color = "steelblue",
  showLine = true,
}: AreaChartProps) => {
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

    const area = d3
      .area<LineData>()
      .x((d) => x(d.date))
      .y0(innerHeight)
      .y1((d) => y(d.value));

    const line = d3
      .line<LineData>()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add the area path
    g.append("path")
      .datum(data)
      .attr("fill", color)
      .attr("fill-opacity", 0.3)
      .attr("d", area);

    // Add the line path if showLine is true
    if (showLine) {
      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);
    }

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    g.append("g").call(d3.axisLeft(y));

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .tickSize(-innerWidth)
          .tickFormat(() => "")
      )
      .style("stroke-dasharray", "3,3")
      .style("stroke-opacity", 0.2);
  }, [data, width, height, margin, color, showLine]);

  return <svg ref={svgRef} />;
};
