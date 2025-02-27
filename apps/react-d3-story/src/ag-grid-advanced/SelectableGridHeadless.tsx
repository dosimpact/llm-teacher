import React, { useMemo } from "react";
import { SelectableGridProps, MonthlyData } from "./types";
import { useSelectableGrid } from "./useSelectableGrid";

export const SelectableGridHeadless: React.FC<SelectableGridProps> = ({
  rowData,
  columnDefs,
  defaultPageSize,
  onSelectionChange,
  renderRow,
  renderHeader,
  renderPagination,
}) => {
  const {
    currentPageData,
    totalPages,
    currentPage,
    setCurrentPage,
    toggleRowSelection,
    totalSum,
    isSelected,
  } = useSelectableGrid({
    rowData,
    defaultPageSize,
    onSelectionChange,
  });

  const sumData = useMemo(
    () =>
      ({
        id: "total",
        company: "합계",
        ...totalSum,
      } as MonthlyData),
    [totalSum]
  );

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
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <span style={{ display: "flex", alignItems: "center", color: "#64748b" }}>
        {currentPage} / {totalPages} 페이지
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
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
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
      {renderHeader({ columns: columnDefs })}
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {currentPageData.map((row) => (
          <React.Fragment key={row.id}>
            {renderRow({
              row,
              isSelected: isSelected(row.id),
              onSelect: () => toggleRowSelection(row.id),
              isTotal: false,
            })}
          </React.Fragment>
        ))}
        {renderRow({
          row: sumData,
          isSelected: false,
          onSelect: () => {},
          isTotal: true,
        })}
      </div>
      {renderPagination
        ? renderPagination({
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
          })
        : defaultPagination}
    </div>
  );
};
