import {expensesApi} from './expensesApi';
import Total from '../model/total';
import Split from '../model/split';
import {SplitSummaryRequest} from '../model/splitSummaryRequest';
import {SplitSummary} from '../model/splitSummary';

const dashboardApi = expensesApi.injectEndpoints({
  endpoints: (builder) => ({
    getAmounts: builder.query<Total[], void>({
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