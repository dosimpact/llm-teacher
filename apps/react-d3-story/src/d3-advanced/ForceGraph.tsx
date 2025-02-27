import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { ChartProps, NetworkData } from "./types";
import { DEFAULT_DIMENSION, getInnerDimensions, createTooltip } from "./utils";

interface ForceGraphProps extends ChartProps {
  data: NetworkData;
  nodeRadius?: number;
  linkStrength?: number;
  chargeStrength?: number;
  onNodeClick?: (nodeId: string) => void;
}

export const ForceGraph = ({
  data,
  width = DEFAULT_DIMENSION.width,
  height = DEFAULT_DIMENSION.height,
  margin = DEFAULT_DIMENSION.margin,
  nodeRadius = 5,
  linkStrength = 0.3,
  chargeStrength = -30,
  className,
  style,
  onNodeClick,
}: ForceGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef =
    useRef<d3.Selection<HTMLDivElement, unknown, null, undefined>>();

  const dimension = useMemo(
    () => ({
      width,
      height,
      margin,
    }),
    [width, height, margin]
  );

  const { width: innerWidth, height: innerHeight } =
    getInnerDimensions(dimension);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 툴팁 생성
    if (!tooltipRef.current) {
      tooltipRef.current = createTooltip();
    }

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 시뮬레이션 설정
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink<NetworkNode, NetworkLink>(data.links)
          .id((d) => d.id)
          .strength(linkStrength)
      )
      .force("charge", d3.forceManyBody().strength(chargeStrength))
      .force("center", d3.forceCenter(innerWidth / 2, innerHeight / 2));

    // 색상 스케일
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // 링크 그리기
    const links = g
      .append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    // 노드 그리기
    const nodes = g
      .append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", nodeRadius)
      .attr("fill", (d) => color(d.group))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .call(drag(simulation));

    // 이벤트 핸들러
    nodes
      .on("mouseover", (event, d) => {
        tooltipRef
          .current!.style("opacity", 1)
          .html(`ID: ${d.id}<br/>Group: ${d.group}<br/>Value: ${d.value}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`);
      })
      .on("mouseout", () => {
        tooltipRef.current!.style("opacity", 0);
      })
      .on("click", (event, d) => {
        if (onNodeClick) {
          onNodeClick(d.id);
        }
      });

    // 시뮬레이션 업데이트
    simulation.on("tick", () => {
      links
        .attr("x1", (d) => (d.source as NetworkNode).x!)
        .attr("y1", (d) => (d.source as NetworkNode).y!)
        .attr("x2", (d) => (d.target as NetworkNode).x!)
        .attr("y2", (d) => (d.target as NetworkNode).y!);

      nodes.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    });

    // 드래그 기능
    function drag(simulation: d3.Simulation<NetworkNode, undefined>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag<SVGCircleElement, NetworkNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    // 클린업
    return () => {
      simulation.stop();
      tooltipRef.current?.remove();
      tooltipRef.current = undefined;
    };
  }, [data, dimension, nodeRadius, linkStrength, chargeStrength, onNodeClick]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
};

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  group: string;
  value: number;
  x?: number;
  y?: number;
}
