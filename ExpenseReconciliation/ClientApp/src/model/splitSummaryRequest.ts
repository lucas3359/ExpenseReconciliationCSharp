export interface SplitSummaryRequest {
  startDate: string;
  endDate: string;
  timeUnit: 'Month' | 'Year';
}