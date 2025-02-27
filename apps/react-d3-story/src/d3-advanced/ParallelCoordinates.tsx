import { useEffect, useRef, memo } from "react";
import * as d3 from "d3";

export interface ParallelCoordinatesData {
  id: string;
  group?: string;
  [key: string]: string | number | undefined;
}

interface ParallelCoordinatesProps {
  data: ParallelCoordinatesData[];
  dimensions?: string[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
  lineOpacity?: number;
  axisLabelRotation?: number;
}

export const ParallelCoordinates = memo(
  ({
    data,
    dimensions = Object.keys(data[0] || {}).filter(
      (d) => d !== "id" && d !== "group"
    ),
    width = 800,
    height = 600,
    margin = { top: 30, right: 50, bottom: 30, left: 50 },
    colors = d3.schemeSet3,
    lineOpacity = 0.5,
    axisLabelRotation = -20,
  }: ParallelCoordinatesProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current || !data.length || !dimensions.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // 스케일 설정
      const y: { [key: string]: d3.ScaleLinear<number, number> } = {};
      dimensions.forEach((dimension) => {
        y[dimension] = d3
          .scaleLinear()
          .domain(
            d3.extent(data, (d) => Number(d[dimension])) as [number, number]
          )
          .range([height - margin.bottom, margin.top]);
      });

      const x = d3
        .scalePoint()
        .range([margin.left, width - margin.right])
        .padding(1)
        .domain(dimensions);

      // 색상 스케일 설정
      const groups = Array.from(new Set(data.map((d) => d.group || d.id)));
      const color = d3.scaleOrdinal<string>().domain(groups).range(colors);

      // 라인 생성기
      const line = d3
        .line()
        .defined((d: any) => !isNaN(d[1]))
        .x((d: any) => d[0])
        .y((d: any) => d[1]);

      // 컨테이너 생성
      const g = svg.append("g");

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

      // 축 그리기
      dimensions.forEach((dimension) => {
        const axis = g
          .append("g")
          .attr("transform", `translate(${x(dimension)},0)`)
          .call(d3.axisLeft(y[dimension]));

        // 축 레이블 추가
        axis
          .append("text")
          .attr("y", margin.top - 10)
          .attr("x", 0)
          .attr("text-anchor", "middle")
          .attr("transform", `rotate(${axisLabelRotation})`)
          .style("fill", "#333")
          .text(dimension);
      });

      // 데이터 라인 그리기
      g.selectAll("path.data-line")
        .data(data)
        .join("path")
        .attr("class", "data-line")
        .attr("d", (d) => {
          return line(dimensions.map((p) => [x(p) || 0, y[p](Number(d[p]))]));
        })
        .style("fill", "none")
        .style("stroke", (d) => color(d.group || d.id))
        .style("stroke-width", 1.5)
        .style("opacity", lineOpacity)
        .on("mouseover", function (event, d) {
          d3.select(this).style("stroke-width", 3).style("opacity", 1);
          tooltip.style("visibility", "visible").html(`
            ID: ${d.id}<br/>
            ${d.group ? `Group: ${d.group}<br/>` : ""}
            ${dimensions.map((p) => `${p}: ${d[p]}`).join("<br/>")}
          `);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this)
            .style("stroke-width", 1.5)
            .style("opacity", lineOpacity);
          tooltip.style("visibility", "hidden");
        });

      // 브러싱 기능 추가
      dimensions.forEach((dimension) => {
        const dimensionG = g
          .append("g")
          .attr("transform", `translate(${x(dimension)},0)`);

        const brush = d3
          .brushY()
          .extent([
            [-8, margin.top],
            [8, height - margin.bottom],
          ])
          .on("brush", function (event) {
            const selection = event.selection;
            if (!selection) return;

            const [low, high] = selection.map(y[dimension].invert);

            g.selectAll(".data-line").style("opacity", (d) => {
              const value = Number(d[dimension]);
              return value >= low && value <= high ? 1 : 0.1;
            });
          })
          .on("end", function (event) {
            if (!event.selection) {
              g.selectAll(".data-line").style("opacity", lineOpacity);
            }
          });

        dimensionG.call(brush);
      });

      return () => {
        tooltip.remove();
      };
    }, [
      data,
      dimensions,
      width,
      height,
      margin,
      colors,
      lineOpacity,
      axisLabelRotation,
    ]);

    return <svg ref={svgRef} width={width} height={height} />;
  }
);

ParallelCoordinates.displayName = "ParallelCoordinates";
