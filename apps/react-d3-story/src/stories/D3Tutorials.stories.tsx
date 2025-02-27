import type { Meta, StoryObj } from "@storybook/react";
import { BasicShapes } from "../d3-tutorials/01-BasicShapes";
import { DataBinding } from "../d3-tutorials/02-DataBinding";
import { Transitions } from "../d3-tutorials/03-Transitions";
import { Interactions } from "../d3-tutorials/04-Interactions";

const meta = {
  title: "D3 Tutorials",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tutorial1_BasicShapes: Story = {
  name: "1. 기본 도형 그리기",
  render: () => <BasicShapes />,
};

export const Tutorial2_DataBinding: Story = {
  name: "2. 데이터 바인딩과 스케일",
  render: () => <DataBinding />,
};

export const Tutorial3_Transitions: Story = {
  name: "3. 트랜지션과 애니메이션",
  render: () => <Transitions />,
};

export const Tutorial4_Interactions: Story = {
  name: "4. 이벤트와 인터랙션",
  render: () => <Interactions />,
};
