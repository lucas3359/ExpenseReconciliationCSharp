import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import toastReducer from './toast/toastSlice';
import {expensesApi} from './api/expensesApi';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(expensesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
