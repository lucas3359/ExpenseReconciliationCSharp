import {expensesApi} from './expensesApi';
import Split from '../model/split';
import {SplitSummaryRequest} from '../model/splitSummaryRequest';
import {SplitSummary} from '../model/splitSummary';
import Totals from '../model/totals';

const dashboardApi = expensesApi.injectEndpoints({
  endpoints: (builder) => ({
    getAmounts: builder.query<Totals, void>({
      query: () => `dashboard/GetAmountAsync`,
    }),
    getSplits: builder.query<Split[], void>({
      query: () => `dashboard/GetAllAsync`,
    }),
    getSplitSummary: builder.query<SplitSummary, SplitSummaryRequest>({
      query: (req) => `dashboard/GetSplitSummary?startDate=${req.startDate}&endDate=${req.endDate}&timeUnit=${req.timeUnit}`
    })
  }),
  overrideExisting: false,
});

export const {
  useGetAmountsQuery,
  useGetSplitsQuery,
  useGetSplitSummaryQuery,
} = dashboardApi;