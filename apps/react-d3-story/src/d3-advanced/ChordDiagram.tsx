import { useEffect, useRef, memo } from "react";
import * as d3 from "d3";

export interface ChordData {
  matrix: number[][];
  names: string[];
  groups?: string[];
}

interface ChordDiagramProps {
  data: ChordData;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
  padAngle?: number;
  labelOffset?: number;
}

export const ChordDiagram = memo(
  ({
    data,
    width = 800,
    height = 800,
    margin = { top: 20, right: 20, bottom: 20, left: 20 },
    colors = d3.schemeSet3,
    padAngle = 0.05,
    labelOffset = 20,
  }: ChordDiagramProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current || !data.matrix.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const radius =
        Math.min(
          width - margin.left - margin.right,
          height - margin.top - margin.bottom
        ) / 2;
      const innerRadius = radius * 0.9;

      // 색상 스케일 설정
      const color = d3
        .scaleOrdinal<string>()
        .domain(data.groups || data.names)
        .range(colors);

      // 코드 레이아웃 생성
      const chord = d3.chord().padAngle(padAngle);

      const chords = chord(data.matrix);

      // 호 생성기
      const arc = d3
        .arc<d3.ChordGroup>()
        .innerRadius(innerRadius)
        .outerRadius(radius);

      // 리본 생성기
      const ribbon = d3.ribbon<d3.Chord>().radius(innerRadius);

      // 컨테이너 생성
      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

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

      // 그룹 그리기
      const group = g.append("g").selectAll("g").data(chords.groups).join("g");

      // 호 그리기
      group
        .append("path")
        .attr("d", arc)
        .style("fill", (d) =>
          color(data.groups?.[d.index] || data.names[d.index])
        )
        .style("stroke", "#fff")
        .on("mouseover", function (event, d) {
          d3.select(this).style("opacity", 0.8);
          tooltip
            .style("visibility", "visible")
            .html(
              `${data.names[d.index]}<br/>Total: ${d3.sum(
                data.matrix[d.index]
              )}`
            );
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).style("opacity", 1);
          tooltip.style("visibility", "hidden");
        });

      // 레이블 그리기
      group
        .append("text")
        .each((d) => {
          d.angle = (d.startAngle + d.endAngle) / 2;
        })
        .attr("dy", ".35em")
        .attr("transform", (d) => {
          const angle = ((d as any).angle * 180) / Math.PI - 90;
          const radius = innerRadius + labelOffset;
          return `rotate(${angle}) translate(${radius},0) ${
            angle > 90 ? "rotate(180)" : ""
          }`;
        })
        .attr("text-anchor", (d) =>
          (d as any).angle > Math.PI ? "end" : "start"
        )
        .text((d, i) => data.names[i])
        .style("font-size", "10px")
        .style("fill", "#333");

      // 리본 그리기
      g.append("g")
        .selectAll("path")
        .data(chords)
        .join("path")
        .attr("d", ribbon)
        .style("fill", (d) =>
          color(data.groups?.[d.source.index] || data.names[d.source.index])
        )
        .style("opacity", 0.7)
        .on("mouseover", function (event, d) {
          d3.select(this).style("opacity", 1);
          tooltip.style("visibility", "visible").html(`
            ${data.names[d.source.index]} → ${data.names[d.target.index]}<br/>
            Value: ${d.source.value}
          `);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).style("opacity", 0.7);
          tooltip.style("visibility", "hidden");
        });

      return () => {
        tooltip.remove();
      };
    }, [data, width, height, margin, colors, padAngle, labelOffset]);

    return <svg ref={svgRef} width={width} height={height} />;
  }
);

ChordDiagram.displayName = "ChordDiagram";
