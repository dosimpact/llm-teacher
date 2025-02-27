export interface YearlyData {
  year: number;
  data: number[];
  color?: string;
}

export interface GroupedBarChartProps {
  title?: string;
  subtitle?: string;
  yearlyData: YearlyData[];
  height?: string | number;
  className?: string;
  yAxisTitle?: string;
  xAxisTitle?: string;
}

export interface CompanyData {
  companyName: string;
  yearlyData: {
    year: number;
    data: number[];
  }[];
  color?: string;
}

export interface ComparisonLineChartProps {
  title?: string;
  subtitle?: string;
  companies: [CompanyData, CompanyData]; // 정확히 2개의 회사 데이터
  height?: string | number;
  className?: string;
  yAxisTitle?: string;
  xAxisTitle?: string;
}
