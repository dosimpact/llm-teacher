import type { Meta, StoryObj } from "@storybook/react";
import { GroupableGridHeadless } from "../../ag-grid-advanced/GroupableGridHeadless";
import {
  MonthlyData,
  RenderPaginationProps,
} from "../../ag-grid-advanced/types";

const meta = {
  title: "AG Grid Advanced/GroupableGridHeadless",
  component: GroupableGridHeadless,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GroupableGridHeadless>;

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

const tableStyles = {
  container: {
    width: "100%",
    minWidth: "1200px",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "200px repeat(12, 1fr)",
    padding: "12px 16px",
    backgroundColor: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
    position: "sticky" as const,
    top: 0,
    fontWeight: 600,
    color: "#1e293b",
  },
  headerCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "200px repeat(12, 1fr)",
    padding: "12px 16px",
    borderBottom: "1px solid #e2e8f0",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#f1f5f9",
    },
  },
  cell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: "16px",
  },
  companyCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  groupRow: {
    backgroundColor: "#f8fafc",
    fontWeight: 600,
  },
  childRow: {
    backgroundColor: "white",
  },
  toggleIcon: {
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderTop: "1px solid #e2e8f0",
    backgroundColor: "#f8fafc",
  },
  paginationInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  paginationControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  select: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    cursor: "pointer",
  },
  itemCount: {
    color: "#64748b",
    fontSize: "0.875rem",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    color: "#1e293b",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover:not(:disabled)": {
      backgroundColor: "#f1f5f9",
      borderColor: "#cbd5e1",
    },
    "&:disabled": {
      backgroundColor: "#f1f5f9",
      color: "#94a3b8",
      cursor: "not-allowed",
    },
  },
  pageNumbers: {
    display: "flex",
    gap: "4px",
  },
  pageNumber: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    color: "#1e293b",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#f1f5f9",
    },
  },
  currentPage: {
    backgroundColor: "#3b82f6",
    color: "white",
    borderColor: "#3b82f6",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
  },
};

const CustomHeader = ({ months }: { months: string[] }) => (
  <div style={tableStyles.header}>
    <div style={tableStyles.headerCell}>회사</div>
    {months.map((month) => (
      <div key={month} style={tableStyles.headerCell}>
        {month}
      </div>
    ))}
  </div>
);

const CustomRow = ({
  row,
  isGroupRow,
  isExpanded,
  onToggleGroup,
}: {
  row: MonthlyData;
  isGroupRow: boolean;
  isExpanded: boolean;
  onToggleGroup: () => void;
}) => (
  <div
    style={{
      ...tableStyles.row,
      ...(isGroupRow ? tableStyles.groupRow : tableStyles.childRow),
    }}
  >
    <div style={tableStyles.companyCell} onClick={onToggleGroup}>
      {isGroupRow && (
        <span style={tableStyles.toggleIcon}>{isExpanded ? "-" : "+"}</span>
      )}
      <span>{row.company}</span>
    </div>
    <div style={tableStyles.cell}>{row.jan.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.feb.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.mar.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.apr.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.may.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.jun.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.jul.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.aug.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.sep.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.oct.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.nov.toLocaleString()}</div>
    <div style={tableStyles.cell}>{row.dec.toLocaleString()}</div>
  </div>
);

const CustomPagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: RenderPaginationProps) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div style={tableStyles.pagination}>
      <div style={tableStyles.paginationInfo}>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={tableStyles.select}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}개씩 보기
            </option>
          ))}
        </select>
        <span style={tableStyles.itemCount}>
          총 {totalItems}개 중 {startItem}-{endItem}
        </span>
      </div>
      <div style={tableStyles.paginationControls}>
        <button
          style={{
            ...tableStyles.button,
            padding: "8px 12px",
          }}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          style={tableStyles.button}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <div style={tableStyles.pageNumbers}>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                style={{
                  ...tableStyles.pageNumber,
                  ...(currentPage === pageNum ? tableStyles.currentPage : {}),
                }}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button
          style={tableStyles.button}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
        <button
          style={{
            ...tableStyles.button,
            padding: "8px 12px",
          }}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    data: sampleData,
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
    renderHeader: CustomHeader,
    renderRow: CustomRow,
    renderPagination: CustomPagination,
  },
};
