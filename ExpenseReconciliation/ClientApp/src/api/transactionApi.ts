import {expensesApi} from './expensesApi';
import PagedTransaction from '../model/pagedTransaction';
import Category from '../model/category';
import Transaction from '../model/transaction';
import UpdateSplit from '../model/updateSplit';

const transactionApi = expensesApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionById: builder.query<Transaction, number>({
      query: (id) => `transaction/GetById?id=${encodeURIComponent(id)}`,
      providesTags: (result, error, id) => [{ type: 'Transactions', id: id }]
    }),
    getTransactionPage: builder.query<PagedTransaction, any>({
      query: ({currentPage, pageSize}) => `transaction/GetAllAsync?page=${currentPage}&pageSize=${pageSize}`,
      providesTags: [{ type: 'Transactions', id: 'LIST' }],
    }),
    getTransactionByDate: builder.query<PagedTransaction, any>({
      query: ({index, pageLimit}) => `transaction/GetByDateAsync?_page=${index}&_limit=${pageLimit}`
    }), // TODO: Was used by ListPaginate, no longer used
    getAllCategories: builder.query<Category[], void>({
      query: () => `transaction/GetAllCategories`,
    }),
    updateSplit: builder.mutation<void, UpdateSplit>({
      query: (split) => ({
        url: `transaction/UpdateSplit`,
        method: 'POST',
        body: split,
      }),
      invalidatesTags: (_) => [
        { type: 'Transactions', id: 'LIST' },
      ],
    }),
    deleteSplit: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `transaction/split/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_) =>  [
        { type: 'Transactions', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
    useGetTransactionPageQuery,
    useGetTransactionByDateQuery,
    useGetAllCategoriesQuery,
    useUpdateSplitMutation,
    useDeleteSplitMutation,
} = transactionApi;