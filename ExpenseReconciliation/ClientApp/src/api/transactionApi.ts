import {expensesApi} from './expensesApi';
import PagedTransaction from '../model/pagedTransaction';
import Transaction from '../model/transaction';
import UpdateSplit from '../model/updateSplit';
import UpdateCategoryModel from '../model/updateCategoryModel';
import TransactionImport from '../model/transactionImport';

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
    importTransactions: builder.mutation<void, TransactionImport>({
      query: (importPayload) => ({
        url: `transaction/Import`,
        method: 'POST',
        body: importPayload,
      }),
      invalidatesTags: (_) => [
        { type: 'Transactions', id: 'LIST' },
      ],
    }),
    updateCategory: builder.mutation<void, UpdateCategoryModel>({
      query: (category) => ({
        url: `transaction/UpdateCategory`,
        method: 'POST',
        body: category
      }),
      invalidatesTags: (_) => [
        { type: 'Transactions', id: 'LIST' }
      ],
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
    useImportTransactionsMutation,
    useUpdateCategoryMutation, 
    useUpdateSplitMutation,
    useDeleteSplitMutation,
} = transactionApi;