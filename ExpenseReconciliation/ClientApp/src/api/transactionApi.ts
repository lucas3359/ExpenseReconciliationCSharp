import {expensesApi} from './expensesApi';
import PagedTransaction from '../model/pagedTransaction';
import Category from '../model/category';
import Transaction from '../model/transaction';
import UpdateSplit from '../model/updateSplit';

const transactionApi = expensesApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionById: builder.query<Transaction, number>({
      query: (id) => `transaction/GetById?id=${encodeURIComponent(id)}`
    }),
    getTransactionPage: builder.query<PagedTransaction, any>({
      query: ({currentPage, pageSize}) => `transaction/GetAllAsync?page=${currentPage}&pageSize=${pageSize}`
    }),
    getTransactionByDate: builder.query<PagedTransaction, any>({
      query: ({index, pageLimit}) => `transaction/GetByDateAsync?_page=${index}&_limit=${pageLimit}`
    }), // TODO: Was used by ListPaginate, no longer used
    getAllCategories: builder.query<Category[], void>({
      query: () => `transaction/GetAllCategories`,
    }),
    postSplit: builder.mutation<void, UpdateSplit>({
      query: (split) => ({
        url: `transaction/UpdateSplit`,
        method: 'POST',
        body: split,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
    useGetTransactionPageQuery,
    useGetTransactionByDateQuery,
    useGetAllCategoriesQuery,
} = transactionApi;