import { useState, useMemo, useCallback } from "react";
import {
  UseGroupableGridProps,
  UseGroupableGridReturn,
  MonthlyData,
  GroupState,
  PaginationState,
} from "./types";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const useGroupableGrid = ({
  data,
  defaultPageSize = 10,
  initialGroupState,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
}: UseGroupableGridProps): UseGroupableGridReturn => {
  const [groupState, setGroupState] = useState<GroupState>(
    initialGroupState ||
      data.reduce((acc, item) => {
        acc[item.company] = true; // 기본적으로 모든 그룹 펼치기
        return acc;
      }, {} as GroupState)
  );

  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage: 1,
    pageSize: defaultPageSize,
    totalItems: 0,
  });

  const toggleGroup = useCallback((company: string) => {
    setGroupState((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  }, []);

  const getGroupedData = useCallback(() => {
    const companies = [...new Set(data.map((item) => item.company))];
    return companies.flatMap((company) => {
      const companyData = data.filter((item) => item.company === company);
      const isExpanded = groupState[company];

      // 그룹 헤더 행 생성
      const headerRow: MonthlyData = {
        id: `${company}-header`,
        company,
        jan: companyData.reduce((sum, item) => sum + item.jan, 0),
        feb: companyData.reduce((sum, item) => sum + item.feb, 0),
        mar: companyData.reduce((sum, item) => sum + item.mar, 0),
        apr: companyData.reduce((sum, item) => sum + item.apr, 0),
        may: companyData.reduce((sum, item) => sum + item.may, 0),
        jun: companyData.reduce((sum, item) => sum + item.jun, 0),
        jul: companyData.reduce((sum, item) => sum + item.jul, 0),
        aug: companyData.reduce((sum, item) => sum + item.aug, 0),
        sep: companyData.reduce((sum, item) => sum + item.sep, 0),
        oct: companyData.reduce((sum, item) => sum + item.oct, 0),
        nov: companyData.reduce((sum, item) => sum + item.nov, 0),
        dec: companyData.reduce((sum, item) => sum + item.dec, 0),
      };

      return isExpanded ? [headerRow, ...companyData] : [headerRow];
    });
  }, [data, groupState]);

  const groupedData = useMemo(() => getGroupedData(), [getGroupedData]);

  // 페이지네이션 상태 업데이트
  const totalItems = useMemo(() => groupedData.length, [groupedData]);
  const totalPages = useMemo(
    () => Math.ceil(totalItems / paginationState.pageSize),
    [totalItems, paginationState.pageSize]
  );

  // 페이지 변경시 현재 페이지가 전체 페이지 수를 넘지 않도록 조정
  useCallback(() => {
    if (paginationState.currentPage > totalPages) {
      setPaginationState((prev) => ({
        ...prev,
        currentPage: Math.max(1, totalPages),
      }));
    }
  }, [totalPages, paginationState.currentPage]);

  const setCurrentPage = useCallback(
    (page: number) => {
      setPaginationState((prev) => ({
        ...prev,
        currentPage: Math.max(1, Math.min(page, totalPages)),
      }));
    },
    [totalPages]
  );

  const setPageSize = useCallback((pageSize: number) => {
    setPaginationState((prev) => ({
      ...prev,
      pageSize,
      currentPage: 1, // 페이지 크기가 변경되면 첫 페이지로 이동
    }));
  }, []);

  const currentPageData = useMemo(() => {
    const { currentPage, pageSize } = paginationState;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return groupedData.slice(startIndex, endIndex);
  }, [groupedData, paginationState]);

  return {
    currentPageData,
    pagination: {
      currentPage: paginationState.currentPage,
      totalPages,
      pageSize: paginationState.pageSize,
      totalItems,
      setCurrentPage,
      setPageSize,
      pageSizeOptions,
    },
    groupState,
    toggleGroup,
    getGroupedData,
  };
};
