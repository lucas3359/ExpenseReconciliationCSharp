import {expensesApi} from './expensesApi';
import Category, {CreateCategoryRequest} from '../model/category';

const categoryApi = expensesApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => `Category`,
      providesTags: [{ type: 'Categories', id: 'ALL' }],
    }),
    createCategory: builder.mutation<void, CreateCategoryRequest>({
      query: (category) => ({
        url: `Category`,
        method: 'POST',
        body: category,
      }),
      invalidatesTags: (_) => [
        { type: 'Categories', id: 'ALL' },
      ],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `Category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_) => [
        { type: 'Categories', id: 'ALL' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
