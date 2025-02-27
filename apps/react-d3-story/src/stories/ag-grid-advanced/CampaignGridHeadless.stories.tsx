import type { Meta, StoryObj } from "@storybook/react";
import { CampaignGridHeadless } from "../../ag-grid-advanced/CampaignGridHeadless";
import {
  CampaignGroupData,
  CampaignRenderRowProps,
  CampaignRenderHeaderProps,
  CampaignData,
  CampaignRenderPaginationProps,
} from "../../ag-grid-advanced/types";

const meta = {
  title: "AG Grid Advanced/CampaignGridHeadless",
  component: CampaignGridHeadless,
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
} satisfies Meta<typeof CampaignGridHeadless>;

export default meta;
type Story = StoryObj<typeof meta>;

const generateCampaignData = (
  name: string,
  subCount: number
): CampaignGroupData => ({
  id: name,
  name,
  isGroup: true,
  status: "active",
  budget: Math.floor(Math.random() * 1000000),
  spent: Math.floor(Math.random() * 500000),
  impressions: Math.floor(Math.random() * 100000),
  clicks: Math.floor(Math.random() * 10000),
  conversions: Math.floor(Math.random() * 1000),
  ctr: Math.random() * 10,
  cpc: Math.random() * 100,
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  subCampaigns: Array.from({ length: subCount }, (_, index) => ({
    id: `${name}-sub-${index + 1}`,
    name: `${name} 하위 캠페인 ${index + 1}`,
    isGroup: false,
    status: "active",
    budget: Math.floor(Math.random() * 100000),
    spent: Math.floor(Math.random() * 50000),
    impressions: Math.floor(Math.random() * 10000),
    clicks: Math.floor(Math.random() * 1000),
    conversions: Math.floor(Math.random() * 100),
    ctr: Math.random() * 10,
    cpc: Math.random() * 100,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  })),
});

const sampleData = [
  generateCampaignData("검색 광고 캠페인", 3),
  generateCampaignData("디스플레이 광고 캠페인", 3),
  generateCampaignData("쇼핑 광고 캠페인", 3),
];

const tableStyles = {
  container: {
    width: "100%",
    minWidth: "1200px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "repeat(11, 1fr)",
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
    justifyContent: "flex-start",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(11, 1fr)",
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
    justifyContent: "flex-start",
  },
  groupRow: {
    backgroundColor: "#f8fafc",
    fontWeight: 600,
  },
  childRow: {
    backgroundColor: "white",
    paddingLeft: "32px",
  },
  toggleIcon: {
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
    marginRight: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  statusBadge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 500,
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "16px",
    borderTop: "1px solid #e2e8f0",
  },
  pageButton: {
    padding: "6px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f1f5f9",
    },
    "&:disabled": {
      backgroundColor: "#f8fafc",
      cursor: "not-allowed",
    },
  },
  selectedRow: {
    backgroundColor: "#e0f2fe",
    "&:hover": {
      backgroundColor: "#bae6fd",
    },
  },
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
};

const CustomHeader = ({ columns }: CampaignRenderHeaderProps) => (
  <div
    style={{
      ...tableStyles.header,
      gridTemplateColumns: "50px repeat(10, 1fr)",
    }}
  >
    {columns.map((col) => (
      <div key={col.field} style={tableStyles.headerCell}>
        {col.headerName}
      </div>
    ))}
  </div>
);

const formatValue = (
  value: string | number,
  type?: "currency" | "number" | "percentage" | "date"
) => {
  switch (type) {
    case "currency":
      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(Number(value));
    case "number":
      return new Intl.NumberFormat("ko-KR").format(Number(value));
    case "percentage":
      return `${Number(value).toFixed(2)}%`;
    case "date":
      return new Date(value).toLocaleDateString("ko-KR");
    default:
      return value;
  }
};

const CustomRow = ({
  row,
  isExpanded,
  isSelected,
  onToggleGroup,
  onBudgetChange,
  onStatusChange,
  onSelect,
}: CampaignRenderRowProps) => (
  <div
    style={{
      ...tableStyles.row,
      ...(row.isGroup ? tableStyles.groupRow : tableStyles.childRow),
      ...(isSelected ? tableStyles.selectedRow : {}),
      gridTemplateColumns: "50px repeat(10, 1fr)",
    }}
  >
    <div style={tableStyles.cell}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        style={tableStyles.checkbox}
      />
    </div>
    <div style={tableStyles.cell}>
      {row.isGroup && (
        <div
          style={tableStyles.toggleIcon}
          onClick={(e) => {
            e.stopPropagation();
            onToggleGroup();
          }}
        >
          {isExpanded ? "-" : "+"}
        </div>
      )}
      {row.name}
    </div>
    <div style={tableStyles.cell}>
      <select
        value={row.status}
        onChange={(e) => {
          e.stopPropagation();
          onStatusChange(e.target.value as CampaignData["status"]);
        }}
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid #e2e8f0",
        }}
      >
        <option value="active">활성</option>
        <option value="paused">일시중지</option>
        <option value="ended">종료</option>
      </select>
    </div>
    <div style={tableStyles.cell}>
      <input
        type="number"
        value={row.budget}
        onChange={(e) => {
          e.stopPropagation();
          onBudgetChange(Number(e.target.value));
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100px",
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid #e2e8f0",
        }}
      />
    </div>
    <div style={tableStyles.cell}>{formatValue(row.spent, "currency")}</div>
    <div style={tableStyles.cell}>{formatValue(row.impressions, "number")}</div>
    <div style={tableStyles.cell}>{formatValue(row.clicks, "number")}</div>
    <div style={tableStyles.cell}>{formatValue(row.conversions, "number")}</div>
    <div style={tableStyles.cell}>{formatValue(row.ctr, "percentage")}</div>
    <div style={tableStyles.cell}>{formatValue(row.cpc, "currency")}</div>
    <div style={tableStyles.cell}>{formatValue(row.startDate, "date")}</div>
    <div style={tableStyles.cell}>{formatValue(row.endDate, "date")}</div>
  </div>
);

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: CampaignRenderPaginationProps) => (
  <div style={tableStyles.pagination}>
    <button
      style={tableStyles.pageButton}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      이전
    </button>
    <span>
      {currentPage} / {totalPages}
    </span>
    <button
      style={tableStyles.pageButton}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      다음
    </button>
  </div>
);

export const Default: Story = {
  args: {
    data: sampleData,
    defaultPageSize: 10,
    renderHeader: CustomHeader,
    renderRow: CustomRow,
    renderPagination: CustomPagination,
    onSelectionChange: (campaign) => {
      console.log("Selected campaign:", campaign);
    },
    onBudgetChange: (campaignId, newBudget) =>
      console.log("Budget changed:", { campaignId, newBudget }),
    onStatusChange: (campaignId, newStatus) =>
      console.log("Status changed:", { campaignId, newStatus }),
    initialGroupState: sampleData.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<string, boolean>),
  },
};
