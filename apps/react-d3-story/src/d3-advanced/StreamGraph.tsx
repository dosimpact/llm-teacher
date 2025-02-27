import { useEffect, useRef, memo } from "react";
import * as d3 from "d3";

export interface StreamData {
  date: Date;
  [key: string]: number | Date;
}

interface StreamGraphProps {
  data: StreamData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
}

export const StreamGraph = memo(
  ({
    data,
    width = 800,
    height = 400,
    margin = { top: 20, right: 30, bottom: 30, left: 40 },
    colors = d3.schemeCategory10,
  }: StreamGraphProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current || !data.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const keys = Object.keys(data[0]).filter((key) => key !== "date");

      // 스케일 설정
      const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date) as [Date, Date])
        .range([margin.left, width - margin.right]);

      const y = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d) =>
            d3.min(keys, (key) => d[key] as number)
          ) as number,
          d3.max(data, (d) =>
            d3.max(keys, (key) => d[key] as number)
          ) as number,
        ])
        .range([height - margin.bottom, margin.top]);

      const color = d3.scaleOrdinal().domain(keys).range(colors);

      // 스택 생성
      const stack = d3.stack().offset(d3.stackOffsetWiggle).keys(keys);

      const series = stack(data);

      // 영역 생성기
      const area = d3
        .area<d3.SeriesPoint<StreamData>>()
        .x((d) => x(d.data.date))
        .y0((d) => y(d[0]))
        .y1((d) => y(d[1]))
        .curve(d3.curveBasis);

      // 스트림 그래프 그리기
      svg
        .selectAll("path")
        .data(series)
        .join("path")
        .attr("d", area)
        .attr("fill", (d) => color(d.key) as string)
        .attr("opacity", 0.8);

      // x축 추가
      const xAxis = d3.axisBottom(x);
      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis);

      // y축 추가
      const yAxis = d3.axisLeft(y);
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

      // 호버 효과
      const tooltip = d3
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("padding", "10px")
        .style("border-radius", "5px");

      svg
        .selectAll("path")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("opacity", 1);
          tooltip.style("visibility", "visible").html(`Category: ${d.key}`);
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function () {
          d3.select(this).attr("opacity", 0.8);
          tooltip.style("visibility", "hidden");
        });

      return () => {
        tooltip.remove();
      };
    }, [data, width, height, margin, colors]);

    return <svg ref={svgRef} width={width} height={height} />;
  }
);

StreamGraph.displayName = "StreamGraph";
