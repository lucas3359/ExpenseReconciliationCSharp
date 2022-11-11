import Totals from './totals';

export interface SplitSummary {
  timeUnit: 'Month' | 'Year';
  startDate: string;
  endDate: string;
  timePeriods: Totals[];
}
