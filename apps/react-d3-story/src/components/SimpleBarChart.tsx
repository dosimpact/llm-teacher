import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataItem {
  label: string;
  value: number;
}

const data: DataItem[] = [
  { label: "월", value: 10 },
  { label: "화", value: 20 },
  { label: "수", value: 15 },
  { label: "목", value: 25 },
  { label: "금", value: 30 },
];

export const SimpleBarChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // SVG 크기 설정
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // SVG 요소 선택 및 크기 설정
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // 그래프 영역 생성
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 스케일 설정
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([innerHeight, 0]);

    // 막대 그리기
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.label) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.value))
      .attr("fill", "steelblue");

    // x축 추가
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // y축 추가
    g.append("g").call(d3.axisLeft(y));

    // 클린업 함수
    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  return <svg ref={svgRef}></svg>;
};
