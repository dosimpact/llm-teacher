import { useState, useMemo, useCallback, useEffect } from "react";
import {
  UseSelectableGridProps,
  UseSelectableGridReturn,
  MonthlyData,
} from "./types";

export const useSelectableGrid = ({
  rowData,
  defaultPageSize = 10,
  onSelectionChange,
}: UseSelectableGridProps): UseSelectableGridReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const totalPages = useMemo(
    () => Math.ceil(rowData.length / defaultPageSize),
    [rowData.length, defaultPageSize]
  );

  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * defaultPageSize;
    const endIndex = startIndex + defaultPageSize;
    return rowData.slice(startIndex, endIndex);
  }, [currentPage, defaultPageSize, rowData]);

  const totalSum = useMemo(() => {
    return rowData.reduce((acc, row) => {
      Object.entries(row).forEach(([key, value]) => {
        if (typeof value === "number" && key !== "id") {
          acc[key] = (acc[key] || 0) + value;
        }
      });
      return acc;
    }, {} as Record<string, number>);
  }, [rowData]);

  useEffect(() => {
    const selectedRow = selectedRowId
      ? rowData.find((row) => row.id === selectedRowId)
      : null;
    onSelectionChange?.(selectedRow || null);
  }, [selectedRowId, rowData, onSelectionChange]);

  const isSelected = useCallback(
    (id: string) => id === selectedRowId,
    [selectedRowId]
  );

  const toggleRowSelection = useCallback(
    (id: string) => {
      setSelectedRowId(selectedRowId === id ? null : id);
    },
    [selectedRowId]
  );

  return {
    currentPageData,
    selectedRowId,
    totalPages,
    currentPage,
    setCurrentPage,
    setSelectedRowId,
    totalSum,
    isSelected,
    toggleRowSelection,
  };
};
