import {expensesApi} from './expensesApi';
import Total from '../model/total';
import Split from '../model/split';

const dashboardApi = expensesApi.injectEndpoints({
  endpoints: (builder) => ({
    getAmounts: builder.query<Total[], void>({
      query: () => `dashboard/GetAmountAsync`,
    }),
    getSplits: builder.query<Split[], void>({
      query: () => `dashboard/GetAllAsync`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAmountsQuery,
  useGetSplitsQuery,
} = dashboardApi;