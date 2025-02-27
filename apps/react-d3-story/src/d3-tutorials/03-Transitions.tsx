import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const initialData = [
  { name: "A", value: 10 },
  { name: "B", value: 30 },
  { name: "C", value: 50 },
  { name: "D", value: 20 },
  { name: "E", value: 40 },
];

export const Transitions = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState(initialData);

  const updateData = () => {
    setData(
      data.map((d) => ({
        ...d,
        value: Math.floor(Math.random() * 100),
      }))
    );
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current);

    // SVG 초기화 (처음 한 번만)
    if (svg.select("g").empty()) {
      svg.append("g").attr("class", "bars");
      svg.append("g").attr("class", "x-axis");
      svg.append("g").attr("class", "y-axis");
    }

    // 스케일 설정
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    // 막대 그래프 업데이트 with 트랜지션
    svg
      .select(".bars")
      .selectAll("rect")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", (d) => x(d.name) || 0)
            .attr("y", height - margin.bottom)
            .attr("width", x.bandwidth())
            .attr("height", 0)
            .attr("fill", "steelblue"),
        (update) => update,
        (exit) => exit.remove()
      )
      .transition()
      .duration(750)
      .ease(d3.easeElastic)
      .attr("x", (d) => x(d.name) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.value));

    // x축 업데이트
    svg
      .select(".x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // y축 업데이트
    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .transition()
      .duration(750)
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <div>
      <h2>D3.js 트랜지션과 애니메이션</h2>
      <button onClick={updateData} style={{ marginBottom: "10px" }}>
        데이터 업데이트
      </button>
      <svg ref={svgRef} width={400} height={200}></svg>
      <div style={{ marginTop: "20px" }}>
        <h3>주요 개념:</h3>
        <ul>
          <li>transition(): 요소의 속성 변화를 부드럽게 애니메이션화</li>
          <li>duration(): 트랜지션 지속 시간 설정</li>
          <li>ease(): 트랜지션의 타이밍 함수 설정</li>
          <li>enter/update/exit 패턴: 데이터 변경에 따른 요소 처리</li>
        </ul>
        <h3>코드 설명:</h3>
        <pre>
          {`// 트랜지션 적용
.transition()
.duration(750)
.ease(d3.easeElastic)

// enter/update/exit 패턴
.join(
  enter => enter.append('rect')
    .attr('initial-attributes'),
  update => update,
  exit => exit.remove()
)`}
        </pre>
      </div>
    </div>
  );
};
