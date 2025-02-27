import type { Meta, StoryObj } from "@storybook/react";
import { SelectableGridHeadless } from "../../ag-grid-advanced/SelectableGridHeadless";
import { MonthlyData } from "../../ag-grid-advanced/types";

const meta = {
  title: "AG Grid Advanced/SelectableGridHeadless",
  component: SelectableGridHeadless,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ margin: "1em", minWidth: "1200px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectableGridHeadless>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateMonthlyData = (company: string, count: number): MonthlyData[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `${company}-${index + 1}`,
    company,
    jan: Math.floor(Math.random() * 1000),
    feb: Math.floor(Math.random() * 1000),
    mar: Math.floor(Math.random() * 1000),
    apr: Math.floor(Math.random() * 1000),
    may: Math.floor(Math.random() * 1000),
    jun: Math.floor(Math.random() * 1000),
    jul: Math.floor(Math.random() * 1000),
    aug: Math.floor(Math.random() * 1000),
    sep: Math.floor(Math.random() * 1000),
    oct: Math.floor(Math.random() * 1000),
    nov: Math.floor(Math.random() * 1000),
    dec: Math.floor(Math.random() * 1000),
  }));

const sampleData = [
  ...generateMonthlyData("A 회사", 3),
  ...generateMonthlyData("B 회사", 4),
];

const columnDefs = [
  { field: "company", headerName: "회사" },
  { field: "jan", headerName: "1월" },
  { field: "feb", headerName: "2월" },
  { field: "mar", headerName: "3월" },
  { field: "apr", headerName: "4월" },
  { field: "may", headerName: "5월" },
  { field: "jun", headerName: "6월" },
  { field: "jul", headerName: "7월" },
  { field: "aug", headerName: "8월" },
  { field: "sep", headerName: "9월" },
  { field: "oct", headerName: "10월" },
  { field: "nov", headerName: "11월" },
  { field: "dec", headerName: "12월" },
];

const CustomHeader = ({ columns }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
      padding: "12px",
      backgroundColor: "#f8fafc",
      borderBottom: "1px solid #e2e8f0",
    }}
  >
    {columns.map((col) => (
      <div key={col.field} style={{ fontWeight: 600 }}>
        {col.headerName}
      </div>
    ))}
  </div>
);

const CustomRow = ({ row, isSelected, onSelect, isTotal }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columnDefs.length}, 1fr)`,
      padding: "12px",
      backgroundColor: isSelected ? "#e0f2fe" : isTotal ? "#f8fafc" : "white",
      borderBottom: "1px solid #e2e8f0",
      cursor: "pointer",
    }}
    onClick={onSelect}
  >
    {columnDefs.map((col) => (
      <div key={col.field}>
        {typeof row[col.field] === "number"
          ? new Intl.NumberFormat("ko-KR").format(row[col.field])
          : row[col.field]}
      </div>
    ))}
  </div>
);

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      padding: "12px",
      borderTop: "1px solid #e2e8f0",
    }}
  >
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      이전
    </button>
    <span>
      {currentPage} / {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      다음
    </button>
  </div>
);

export const Default: Story = {
  args: {
    rowData: sampleData,
    columnDefs,
    defaultPageSize: 5,
    renderHeader: CustomHeader,
    renderRow: CustomRow,
    renderPagination: CustomPagination,
    onSelectionChange: (row) => console.log("Selected:", row),
  },
};
