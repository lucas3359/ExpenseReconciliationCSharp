export interface SplitSummary {
  timeUnit: 'Month' | 'Year';
  startDate: string;
  endDate: string;
  total: SplitSummaryTotal[],
  unassigned: number,
}

export interface SplitSummaryTotal {
  timeDescription: string,
  userId: number,
  amount: number,
}