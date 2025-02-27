import * as d3 from "d3";
import { Dimension } from "./types";

export const DEFAULT_DIMENSION: Dimension = {
  width: 600,
  height: 400,
  margin: {
    top: 20,
    right: 30,
    bottom: 40,
    left: 50,
  },
};

export const getInnerDimensions = (dimension: Dimension) => {
  const { width, height, margin } = dimension;
  return {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
  };
};

export const createColorScale = (domain: string[]) => {
  return d3.scaleOrdinal<string>().domain(domain).range(d3.schemeCategory10);
};

export const createLinearScale = (
  domain: [number, number],
  range: [number, number]
) => {
  return d3.scaleLinear().domain(domain).range(range).nice();
};

export const createTimeScale = (
  domain: [Date, Date],
  range: [number, number]
) => {
  return d3.scaleTime().domain(domain).range(range);
};

export const createAxis = (
  scale: d3.AxisScale<d3.NumberValue | Date | string>,
  orientation: "left" | "right" | "top" | "bottom"
) => {
  switch (orientation) {
    case "left":
      return d3.axisLeft(scale);
    case "right":
      return d3.axisRight(scale);
    case "top":
      return d3.axisTop(scale);
    case "bottom":
      return d3.axisBottom(scale);
  }
};

export const createTooltip = () => {
  return d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("background", "rgba(0, 0, 0, 0.8)")
    .style("color", "white")
    .style("padding", "8px")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("opacity", 0);
};

export const formatValue = (value: number) => {
  return d3.format(",")(value);
};

export const formatDate = (date: Date) => {
  return d3.timeFormat("%Y-%m-%d")(date);
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const generateGradientId = (prefix: string) => {
  return `${prefix}-gradient-${Math.random().toString(36).substr(2, 9)}`;
};
