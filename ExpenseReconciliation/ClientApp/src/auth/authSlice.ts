import {createSlice} from '@reduxjs/toolkit';
import Session from '../model/session';
import {RootState} from '../store';

const initialState: Session = {
  loggedIn: false,
  user: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      console.log('[Auth] Login with token');
      // todo: side effects
      // const response: any = await fetcher(`/api/user/me`, token);
      const user = {id: 1, userName: 'Demo', email: '3'};
      
      state = {
        loggedIn: true,
        user: user,
        token: action.payload.token
      }
    },
    logout: (state) => {
      console.log('[Auth] Log out');
      state = initialState;
    },
    unauthenticated: (state) => {
      console.log('[Auth] Attempted to access page without authentication');
    }
  },
});

export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export const { login, logout, unauthenticated } = authSlice.actions;

export default authSlice.reducer;