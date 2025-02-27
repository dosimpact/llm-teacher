export interface MonthlyData {
  id: string;
  company: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  [key: string]: string | number;
}

export interface ColumnDefinition {
  field: string;
  headerName: string;
  width?: number;
}

export interface UseSelectableGridProps {
  rowData: MonthlyData[];
  defaultPageSize?: number;
  onSelectionChange?: (selectedRow: MonthlyData | null) => void;
}

export interface UseSelectableGridReturn {
  currentPageData: MonthlyData[];
  selectedRowId: string | null;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setSelectedRowId: (id: string | null) => void;
  totalSum: Record<string, number>;
  isSelected: (id: string) => boolean;
  toggleRowSelection: (id: string) => void;
}

export interface SelectableGridProps extends UseSelectableGridProps {
  columnDefs: ColumnDefinition[];
  renderRow: (props: RenderRowProps) => React.ReactNode;
  renderHeader: (props: RenderHeaderProps) => React.ReactNode;
  renderPagination?: (props: RenderPaginationProps) => React.ReactNode;
}

export interface RenderRowProps {
  row: MonthlyData;
  isSelected: boolean;
  onSelect: () => void;
  isTotal?: boolean;
}

export interface RenderHeaderProps {
  columns: ColumnDefinition[];
}

export interface RenderPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface GroupState {
  [key: string]: boolean;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface UseGroupableGridProps {
  data: MonthlyData[];
  defaultPageSize?: number;
  initialGroupState?: GroupState;
  pageSizeOptions?: number[];
}

export interface UseGroupableGridReturn {
  currentPageData: MonthlyData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
    pageSizeOptions: number[];
  };
  groupState: GroupState;
  toggleGroup: (company: string) => void;
  getGroupedData: () => MonthlyData[];
}

export interface GroupableGridProps extends UseGroupableGridProps {
  renderRow: (props: RenderRowProps) => React.ReactNode;
  renderHeader: (props: RenderHeaderProps) => React.ReactNode;
  renderPagination?: (props: RenderPaginationProps) => React.ReactNode;
}

export interface CampaignData {
  id: string;
  name: string;
  status: "active" | "paused" | "ended";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  startDate: string;
  endDate: string;
}

export interface CampaignGroupData extends CampaignData {
  isGroup: boolean;
  subCampaigns?: CampaignData[];
}

export interface UseCampaignGridProps {
  data: CampaignGroupData[];
  defaultPageSize?: number;
  initialGroupState?: GroupState;
  onBudgetChange?: (campaignId: string, newBudget: number) => void;
  onStatusChange?: (
    campaignId: string,
    newStatus: CampaignData["status"]
  ) => void;
  onSelectionChange?: (selectedCampaign: CampaignGroupData | null) => void;
}

export interface UseCampaignGridReturn {
  currentPageData: CampaignGroupData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
  };
  groupState: GroupState;
  toggleGroup: (campaignId: string) => void;
  updateBudget: (campaignId: string, newBudget: number) => void;
  updateStatus: (campaignId: string, newStatus: CampaignData["status"]) => void;
  selectedCampaignId: string | null;
  setSelectedCampaignId: (id: string | null) => void;
}

export interface CampaignGridProps extends UseCampaignGridProps {
  renderRow: (props: CampaignRenderRowProps) => React.ReactNode;
  renderHeader: (props: CampaignRenderHeaderProps) => React.ReactNode;
  renderPagination?: (props: CampaignRenderPaginationProps) => React.ReactNode;
}

export interface CampaignRenderRowProps {
  row: CampaignGroupData;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleGroup: () => void;
  onBudgetChange: (newBudget: number) => void;
  onStatusChange: (newStatus: CampaignData["status"]) => void;
  onSelect: () => void;
}

export interface CampaignRenderHeaderProps {
  columns: {
    field: keyof CampaignData;
    headerName: string;
    width?: number;
    type?: "number" | "currency" | "percentage" | "date";
  }[];
}

export interface CampaignRenderPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}
