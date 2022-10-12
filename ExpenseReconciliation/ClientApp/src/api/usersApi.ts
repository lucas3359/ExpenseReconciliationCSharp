import {expensesApi} from './expensesApi';
import User from '../model/user';

const usersApi = expensesApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => `user/me`,
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => `user`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCurrentUserQuery,
  useGetAllUsersQuery,
} = usersApi;