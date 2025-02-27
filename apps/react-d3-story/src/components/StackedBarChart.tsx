import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ChartDimension } from "../types/chart";

interface StackedData {
  category: string;
  [key: string]: string | number;
}

interface StackedBarChartProps extends ChartDimension {
  data: StackedData[];
  keys: string[];
}

export const StackedBarChart = ({
  data,
  keys,
  width = 600,
  height = 400,
  margin = { top: 20, right: 80, bottom: 30, left: 40 },
}: StackedBarChartProps) => {
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
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => {
          return keys.reduce((sum, key) => sum + (Number(d[key]) || 0), 0);
        }) || 0,
      ])
      .range([innerHeight, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10).domain(keys);

    const stackGen = d3.stack<StackedData>().keys(keys);

    const stackedData = stackGen(data);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add bars
    g.selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.category) || 0)
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

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
      .data(keys)
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
  }, [data, keys, width, height, margin]);

  return <svg ref={svgRef} />;
};
