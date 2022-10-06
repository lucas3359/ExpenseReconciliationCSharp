import Split from '../model/split';
import Total from '../model/total';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {selectToken} from '../auth/authSlice';
import {RootState} from '../store';
import User from '../model/user';

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/`, //TODO: Configurable
    prepareHeaders: (headers, { getState }) => {
      // const token = selectToken(getState() as RootState); TODO: better fetching/storing token
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Accept', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAmounts: builder.query<Total[], undefined>({
      query: () => `dashboard/GetAmountAsync`,
    }),
    getSplits: builder.query<Split[], undefined>({
      query: () => `dashboard/GetAllAsync`,
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => `user/me`,
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => `user`,
    }),
  }),
});

export const { useGetAmountsQuery, useGetSplitsQuery, useGetCurrentUserQuery, useGetAllUsersQuery } = expensesApi;
