import {expensesApi} from './expensesApi';
import Category from '../model/category';

const categoryApi = expensesApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => `Category`,
      providesTags: [{ type: 'Categories', id: 'ALL' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCategoriesQuery,
} = categoryApi;
