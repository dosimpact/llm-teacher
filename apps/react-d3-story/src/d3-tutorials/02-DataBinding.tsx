import { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  { name: "A", value: 10 },
  { name: "B", value: 30 },
  { name: "C", value: 50 },
  { name: "D", value: 20 },
  { name: "E", value: 40 },
];

export const DataBinding = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current);

    // SVG 초기화
    svg.selectAll("*").remove();

    // 스케일 설정
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([height - margin.bottom, margin.top]);

    // 막대 그래프 그리기
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.name) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.value))
      .attr("fill", "steelblue");

    // x축 추가
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // y축 추가
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, []);

  return (
    <div>
      <h2>D3.js 데이터 바인딩과 스케일</h2>
      <svg ref={svgRef} width={400} height={200}></svg>
      <div style={{ marginTop: "20px" }}>
        <h3>주요 개념:</h3>
        <ul>
          <li>
            데이터 바인딩: selectAll().data().join()을 사용하여 데이터와 DOM
            요소를 연결
          </li>
          <li>
            scaleBand: 카테고리형 데이터를 위한 스케일 (막대 그래프에서 x축)
          </li>
          <li>scaleLinear: 연속형 데이터를 위한 스케일 (y축)</li>
          <li>axis: 축을 자동으로 생성하고 스케일과 연결</li>
        </ul>
        <h3>코드 설명:</h3>
        <pre>
          {`// 데이터 바인딩
svg.selectAll('rect')
  .data(data)
  .join('rect')

// 스케일 설정
const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([margin.left, width - margin.right])

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([height - margin.bottom, margin.top])`}
        </pre>
      </div>
    </div>
  );
};
