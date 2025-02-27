import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { MultiLineData, ChartDimension } from "../types/chart";

interface MultiLineChartProps extends ChartDimension {
  data: MultiLineData[];
  showPoints?: boolean;
}

export const MultiLineChart = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 80, bottom: 30, left: 40 },
  showPoints = true,
}: MultiLineChartProps) => {
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

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const groups = Array.from(new Set(data.map((d) => d.group)));

    const line = d3
      .line<MultiLineData>()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add lines
    groups.forEach((group) => {
      const groupData = data.filter((d) => d.group === group);
      g.append("path")
        .datum(groupData)
        .attr("fill", "none")
        .attr("stroke", color(group))
        .attr("stroke-width", 2)
        .attr("d", line);

      // Add points if showPoints is true
      if (showPoints) {
        g.selectAll(`.point-${group}`)
          .data(groupData)
          .join("circle")
          .attr("class", `point-${group}`)
          .attr("cx", (d) => x(d.date))
          .attr("cy", (d) => y(d.value))
          .attr("r", 4)
          .attr("fill", color(group));
      }
    });

    // Add x-axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    g.append("g").call(d3.axisLeft(y));

    // Add legend
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
  }, [data, width, height, margin, showPoints]);

  return <svg ref={svgRef} />;
};
