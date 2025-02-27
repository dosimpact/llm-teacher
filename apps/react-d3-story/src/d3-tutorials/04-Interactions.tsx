import { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  { name: "A", value: 10 },
  { name: "B", value: 30 },
  { name: "C", value: 50 },
  { name: "D", value: 20 },
  { name: "E", value: 40 },
];

export const Interactions = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current);

    // SVG 초기화
    svg.selectAll("*").remove();

    // 툴팁 생성
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("padding", "5px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("opacity", 0);

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
      .attr("fill", "steelblue")
      // 마우스 이벤트 처리
      .on("mouseover", (event, d) => {
        const [mouseX, mouseY] = d3.pointer(event);

        // 막대 색상 변경
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr("fill", "orange");

        // 툴팁 표시
        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(`이름: ${d.name}<br/>값: ${d.value}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", (event) => {
        // 막대 색상 원래대로
        d3.select(event.currentTarget)
          .transition()
          .duration(500)
          .attr("fill", "steelblue");

        // 툴팁 숨기기
        tooltip.transition().duration(500).style("opacity", 0);
      })
      // 클릭 이벤트
      .on("click", (event, d) => {
        alert(`${d.name} 선택됨: ${d.value}`);
      });

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

    // 클린업 함수
    return () => {
      tooltip.remove();
    };
  }, []);

  return (
    <div>
      <h2>D3.js 이벤트와 인터랙션</h2>
      <svg ref={svgRef} width={400} height={200}></svg>
      <div style={{ marginTop: "20px" }}>
        <h3>주요 개념:</h3>
        <ul>
          <li>이벤트 리스너: on() 메서드로 이벤트 처리</li>
          <li>d3.pointer(): 마우스 위치 가져오기</li>
          <li>툴팁: 마우스 오버시 추가 정보 표시</li>
          <li>트랜지션: 부드러운 상태 변화</li>
        </ul>
        <h3>코드 설명:</h3>
        <pre>
          {`// 이벤트 리스너 추가
.on('mouseover', (event, d) => {
  // 이벤트 처리
})

// 마우스 위치 가져오기
const [mouseX, mouseY] = d3.pointer(event)

// 툴팁 표시
tooltip
  .style('left', \`\${mouseX}px\`)
  .style('top', \`\${mouseY}px\`)
  .style('opacity', 1)`}
        </pre>
      </div>
    </div>
  );
};
