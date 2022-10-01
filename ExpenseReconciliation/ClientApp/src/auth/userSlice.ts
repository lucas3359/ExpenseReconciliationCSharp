import {ApiStatus} from '../model/apiStatus';
import User from '../model/user';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getAllUsers} from '../api/userClient';
import {RootState} from '../store';

interface UserState {
  status: ApiStatus;
  users: User[];
}

const initialState: UserState = {
  status: ApiStatus.Idle,
  users: [],
} 

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
          state.status = ApiStatus.Loading;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = ApiStatus.Succeeded;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.status = ApiStatus.Failed;
        state.users = [];
      });
  },
});

export const fetchAllUsers = createAsyncThunk('users/fetch', async () => {
  return await getAllUsers();
});

export const selectUsers = (state: RootState) => state.users;

export const {} = userSlice.actions;
export default userSlice.reducer;