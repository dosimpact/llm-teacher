import { useState, useMemo, useCallback, useEffect } from "react";
import {
  UseCampaignGridProps,
  UseCampaignGridReturn,
  CampaignGroupData,
  GroupState,
  PaginationState,
} from "./types";

export const useCampaignGrid = ({
  data,
  defaultPageSize = 10,
  initialGroupState,
  onBudgetChange,
  onStatusChange,
  onSelectionChange,
}: UseCampaignGridProps): UseCampaignGridReturn => {
  const [groupState, setGroupState] = useState<GroupState>(
    initialGroupState ||
      data.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {} as GroupState)
  );

  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null
  );

  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage: 1,
    pageSize: defaultPageSize,
    totalItems: 0,
  });

  useEffect(() => {
    const selectedCampaign = selectedCampaignId
      ? data.find((campaign) => campaign.id === selectedCampaignId) ||
        data
          .find((campaign) =>
            campaign.subCampaigns?.some((sub) => sub.id === selectedCampaignId)
          )
          ?.subCampaigns?.find((sub) => sub.id === selectedCampaignId)
      : null;

    if (selectedCampaign) {
      const isSubCampaign = !data.some(
        (campaign) => campaign.id === selectedCampaign.id
      );
      onSelectionChange?.({
        ...selectedCampaign,
        isGroup: !isSubCampaign,
      });
    } else {
      onSelectionChange?.(null);
    }
  }, [selectedCampaignId, data, onSelectionChange]);

  const toggleGroup = useCallback((campaignId: string) => {
    setGroupState((prev) => ({
      ...prev,
      [campaignId]: !prev[campaignId],
    }));
  }, []);

  const getExpandedData = useCallback(() => {
    return data.reduce((acc: CampaignGroupData[], campaign) => {
      acc.push(campaign);
      if (groupState[campaign.id] && campaign.subCampaigns) {
        acc.push(
          ...campaign.subCampaigns.map((sub) => ({
            ...sub,
            isGroup: false,
          }))
        );
      }
      return acc;
    }, []);
  }, [data, groupState]);

  const expandedData = useMemo(() => getExpandedData(), [getExpandedData]);

  const totalItems = useMemo(() => expandedData.length, [expandedData]);
  const totalPages = useMemo(
    () => Math.ceil(totalItems / paginationState.pageSize),
    [totalItems, paginationState.pageSize]
  );

  const setCurrentPage = useCallback(
    (page: number) => {
      setPaginationState((prev) => ({
        ...prev,
        currentPage: Math.max(1, Math.min(page, totalPages)),
      }));
    },
    [totalPages]
  );

  const setPageSize = useCallback((size: number) => {
    setPaginationState((prev) => ({
      ...prev,
      pageSize: size,
      currentPage: 1,
    }));
  }, []);

  const currentPageData = useMemo(() => {
    const { currentPage, pageSize } = paginationState;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return expandedData.slice(startIndex, endIndex);
  }, [expandedData, paginationState]);

  const updateBudget = useCallback(
    (campaignId: string, newBudget: number) => {
      onBudgetChange?.(campaignId, newBudget);
    },
    [onBudgetChange]
  );

  const updateStatus = useCallback(
    (campaignId: string, newStatus: CampaignGroupData["status"]) => {
      onStatusChange?.(campaignId, newStatus);
    },
    [onStatusChange]
  );

  return {
    currentPageData,
    pagination: {
      currentPage: paginationState.currentPage,
      totalPages,
      pageSize: paginationState.pageSize,
      totalItems,
      setCurrentPage,
      setPageSize,
    },
    groupState,
    toggleGroup,
    updateBudget,
    updateStatus,
    selectedCampaignId,
    setSelectedCampaignId,
  };
};
