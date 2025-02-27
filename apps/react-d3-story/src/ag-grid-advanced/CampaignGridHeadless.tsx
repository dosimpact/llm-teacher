import React from "react";
import {
  CampaignGridProps,
  CampaignRenderHeaderProps,
  CampaignData,
} from "./types";
import { useCampaignGrid } from "./useCampaignGrid";

const defaultColumns: CampaignRenderHeaderProps["columns"] = [
  { field: "checkbox", headerName: "", width: 50, type: "checkbox" },
  { field: "name" as keyof CampaignData, headerName: "캠페인명", width: 200 },
  { field: "status" as keyof CampaignData, headerName: "상태", width: 100 },
  {
    field: "budget" as keyof CampaignData,
    headerName: "예산",
    width: 120,
    type: "currency",
  },
  {
    field: "spent" as keyof CampaignData,
    headerName: "지출",
    width: 120,
    type: "currency",
  },
  {
    field: "impressions" as keyof CampaignData,
    headerName: "노출수",
    width: 120,
    type: "number",
  },
  {
    field: "clicks" as keyof CampaignData,
    headerName: "클릭수",
    width: 120,
    type: "number",
  },
  {
    field: "conversions" as keyof CampaignData,
    headerName: "전환수",
    width: 120,
    type: "number",
  },
  {
    field: "ctr" as keyof CampaignData,
    headerName: "CTR",
    width: 100,
    type: "percentage",
  },
  {
    field: "cpc" as keyof CampaignData,
    headerName: "CPC",
    width: 100,
    type: "currency",
  },
  {
    field: "startDate" as keyof CampaignData,
    headerName: "시작일",
    width: 120,
    type: "date",
  },
  {
    field: "endDate" as keyof CampaignData,
    headerName: "종료일",
    width: 120,
    type: "date",
  },
];

export const CampaignGridHeadless: React.FC<CampaignGridProps> = ({
  data,
  defaultPageSize,
  initialGroupState,
  onBudgetChange,
  onStatusChange,
  onSelectionChange,
  renderRow,
  renderHeader,
  renderPagination,
}) => {
  const {
    currentPageData,
    pagination,
    groupState,
    toggleGroup,
    updateBudget,
    updateStatus,
    selectedCampaignId,
    setSelectedCampaignId,
  } = useCampaignGrid({
    data,
    defaultPageSize,
    initialGroupState,
    onBudgetChange,
    onStatusChange,
    onSelectionChange,
  });

  return (
    <div>
      {renderHeader({ columns: defaultColumns })}
      {currentPageData.map((row) => (
        <React.Fragment key={row.id}>
          {renderRow({
            row,
            isExpanded: groupState[row.id] || false,
            isSelected: row.id === selectedCampaignId,
            onToggleGroup: () => toggleGroup(row.id),
            onBudgetChange: (newBudget) => updateBudget(row.id, newBudget),
            onStatusChange: (newStatus) => updateStatus(row.id, newStatus),
            onSelect: () =>
              setSelectedCampaignId(
                selectedCampaignId === row.id ? null : row.id
              ),
          })}
        </React.Fragment>
      ))}
      {renderPagination &&
        renderPagination({
          currentPage: pagination.currentPage,
          totalPages: pagination.totalPages,
          pageSize: pagination.pageSize,
          totalItems: pagination.totalItems,
          onPageChange: pagination.setCurrentPage,
        })}
    </div>
  );
};
