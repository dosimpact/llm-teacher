import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { PieData, ChartDimension } from "../types/chart";

interface PieChartProps extends ChartDimension {
  data: PieData[];
  innerRadius?: number;
}

export const PieChart = ({
  data,
  width = 400,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  innerRadius = 0,
}: PieChartProps) => {
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

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3
      .pie<PieData>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<PieData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    const labelArc = d3
      .arc<d3.PieArcDatum<PieData>>()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.8);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Add slices
    arcs
      .append("path")
      .attr("d", arc)
      .style("fill", (d, i) => color(i.toString()));

    // Add labels
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text((d) => `${d.data.label} (${d.data.value})`);
  }, [data, width, height, margin, innerRadius]);

  return <svg ref={svgRef} />;
};
