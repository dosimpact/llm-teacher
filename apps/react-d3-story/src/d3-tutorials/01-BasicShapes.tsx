import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const BasicShapes = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // SVG 초기화
    svg.selectAll("*").remove();

    // 원 그리기
    svg
      .append("circle")
      .attr("cx", 50)
      .attr("cy", 50)
      .attr("r", 30)
      .style("fill", "red");

    // 사각형 그리기
    svg
      .append("rect")
      .attr("x", 100)
      .attr("y", 30)
      .attr("width", 60)
      .attr("height", 40)
      .style("fill", "blue");

    // 선 그리기
    svg
      .append("line")
      .attr("x1", 180)
      .attr("y1", 30)
      .attr("x2", 240)
      .attr("y2", 70)
      .style("stroke", "green")
      .style("stroke-width", 2);

    // 경로(path) 그리기
    svg
      .append("path")
      .attr("d", "M 250 50 Q 280 20, 300 50 T 350 50")
      .style("fill", "none")
      .style("stroke", "purple")
      .style("stroke-width", 2);

    // 텍스트 추가
    svg
      .append("text")
      .attr("x", 50)
      .attr("y", 100)
      .text("D3.js 기본 도형")
      .style("font-family", "sans-serif")
      .style("font-size", "14px");
  }, []);

  return (
    <div>
      <h2>D3.js 기본 도형 그리기</h2>
      <svg ref={svgRef} width={400} height={150}></svg>
      <div style={{ marginTop: "20px" }}>
        <h3>설명:</h3>
        <ul>
          <li>circle: cx, cy로 중심점을 지정하고 r로 반지름을 설정</li>
          <li>rect: x, y로 시작점을 지정하고 width, height로 크기 설정</li>
          <li>line: x1, y1에서 x2, y2까지 선을 그림</li>
          <li>path: d 속성으로 복잡한 경로를 그릴 수 있음</li>
          <li>text: x, y 위치에 텍스트를 표시</li>
        </ul>
      </div>
    </div>
  );
};
