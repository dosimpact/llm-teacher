import React from "react";
import { GroupableGridProps } from "./types";
import { useGroupableGrid } from "./useGroupableGrid";

const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const GroupableGridHeadless: React.FC<GroupableGridProps> = ({
  data,
  defaultPageSize,
  pageSizeOptions,
  initialGroupState,
  renderRow,
  renderHeader,
  renderPagination,
}) => {
  const { currentPageData, pagination, groupState, toggleGroup } =
    useGroupableGrid({
      data,
      defaultPageSize,
      pageSizeOptions,
      initialGroupState,
    });

  const defaultPagination = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        padding: "16px",
        borderTop: "1px solid #e2e8f0",
        backgroundColor: "#f8fafc",
      }}
    >
      <button
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          backgroundColor: "white",
          color: "#1e293b",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onClick={() => pagination.setCurrentPage(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
      >
        이전
      </button>
      <span style={{ display: "flex", alignItems: "center", color: "#64748b" }}>
        {pagination.currentPage} / {pagination.totalPages} 페이지
      </span>
      <button
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          backgroundColor: "white",
          color: "#1e293b",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onClick={() => pagination.setCurrentPage(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
      >
        다음
      </button>
    </div>
  );

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      {renderHeader({ months: MONTHS })}
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {currentPageData.map((row) => {
          const isGroupRow = row.id.endsWith("-header");
          return (
            <React.Fragment key={row.id}>
              {renderRow({
                row,
                isGroupRow,
                isExpanded: isGroupRow ? groupState[row.company] : false,
                onToggleGroup: () => toggleGroup(row.company),
              })}
            </React.Fragment>
          );
        })}
      </div>
      {renderPagination
        ? renderPagination({
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            pageSize: pagination.pageSize,
            totalItems: pagination.totalItems,
            pageSizeOptions: pagination.pageSizeOptions,
            onPageChange: pagination.setCurrentPage,
            onPageSizeChange: pagination.setPageSize,
          })
        : defaultPagination}
    </div>
  );
};
