import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`, //TODO: Configurable
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
  endpoints: () => ({}),
});

export const {} = expensesApi;
