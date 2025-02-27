import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ChartDimension } from "../types/chart";

interface RadarData {
  axis: string;
  value: number;
}

interface RadarChartProps extends ChartDimension {
  data: RadarData[];
  maxValue?: number;
  levels?: number;
  color?: string;
}

export const RadarChart = ({
  data,
  width = 500,
  height = 500,
  margin = { top: 50, right: 50, bottom: 50, left: 50 },
  maxValue = 0,
  levels = 5,
  color = "steelblue",
}: RadarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const radius =
      Math.min(
        width - margin.left - margin.right,
        height - margin.top - margin.bottom
      ) / 2;
    const angleSlice = (Math.PI * 2) / data.length;

    // If maxValue is not provided, use the maximum value from data
    const actualMaxValue = maxValue || Math.max(...data.map((d) => d.value));

    const rScale = d3
      .scaleLinear()
      .domain([0, actualMaxValue])
      .range([0, radius]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Draw the circular grid
    for (let j = 0; j < levels; j++) {
      const levelFactor = radius * ((j + 1) / levels);
      g.selectAll(".levels")
        .data(data)
        .join("line")
        .attr(
          "x1",
          (d, i) => levelFactor * Math.cos(angleSlice * i - Math.PI / 2)
        )
        .attr(
          "y1",
          (d, i) => levelFactor * Math.sin(angleSlice * i - Math.PI / 2)
        )
        .attr(
          "x2",
          (d, i) => levelFactor * Math.cos(angleSlice * (i + 1) - Math.PI / 2)
        )
        .attr(
          "y2",
          (d, i) => levelFactor * Math.sin(angleSlice * (i + 1) - Math.PI / 2)
        )
        .attr("class", "line-level")
        .style("stroke", "gray")
        .style("stroke-opacity", "0.75")
        .style("stroke-width", "0.3px");
    }

    // Draw the axes
    const axis = g
      .selectAll(".axis")
      .data(data)
      .join("g")
      .attr("class", "axis");

    axis
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("class", "line")
      .style("stroke", "gray")
      .style("stroke-width", "1px");

    // Draw the area
    const radarLine = d3
      .lineRadial<RadarData>()
      .radius((d) => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    g.selectAll(".radar-wrapper")
      .data([data])
      .join("g")
      .attr("class", "radar-wrapper")
      .append("path")
      .attr("class", "radar-area")
      .attr("d", radarLine)
      .style("fill", color)
      .style("fill-opacity", 0.5)
      .style("stroke", color)
      .style("stroke-width", "2px");

    // Add labels
    axis
      .append("text")
      .attr("class", "legend")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr(
        "x",
        (d, i) => radius * 1.15 * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        "y",
        (d, i) => radius * 1.15 * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .text((d) => d.axis);
  }, [data, width, height, margin, maxValue, levels, color]);

  return <svg ref={svgRef} />;
};
