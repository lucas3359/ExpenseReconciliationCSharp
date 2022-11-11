export interface SplitSummary {
  timeUnit: 'Month' | 'Year';
  startDate: string;
  endDate: string;
  timePeriods: TimePeriod[];
}

export interface TimePeriod {
  timeDescription: string;
  unassigned: number;
  totals: Total[];
}

export interface Total {
  userId: number;
  debit: number;
  credit: number;
}
