import { useEffect, useRef, memo } from "react";
import * as d3 from "d3";
import { GraphData, Node, Link } from "../types/graph";

interface ForceDirectedGraphProps {
  data: GraphData;
  width?: number;
  height?: number;
  nodeRadius?: number;
  linkDistance?: number;
  charge?: number;
}

export const ForceDirectedGraph = memo(
  ({
    data,
    width = 600,
    height = 400,
    nodeRadius = 5,
    linkDistance = 100,
    charge = -30,
  }: ForceDirectedGraphProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current || !data.nodes.length) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const simulation = d3
        .forceSimulation(data.nodes)
        .force(
          "link",
          d3
            .forceLink(data.links)
            .id((d: any) => d.id)
            .distance(linkDistance)
        )
        .force("charge", d3.forceManyBody().strength(charge))
        .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg
        .append("g")
        .selectAll("line")
        .data(data.links)
        .join("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", (d: Link) => Math.sqrt(d.value || 1));

      const node = svg
        .append("g")
        .selectAll("circle")
        .data(data.nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .attr("fill", "#69b3a2")
        .call(drag(simulation) as any);

      node.append("title").text((d: Node) => d.id);

      simulation.on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);

        node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
      });

      return () => {
        simulation.stop();
      };
    }, [data, width, height, nodeRadius, linkDistance, charge]);

    const drag = (simulation: d3.Simulation<Node, undefined>) => {
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
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };

    return <svg ref={svgRef} width={width} height={height} />;
  }
);

ForceDirectedGraph.displayName = "ForceDirectedGraph";
