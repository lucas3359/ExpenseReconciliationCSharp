import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getAmounts} from '../api/dashboardClient';
import {ApiStatus} from '../model/apiStatus';
import {RootState} from '../store';
import Total from '../model/total';

interface DashboardState {
  status: ApiStatus;
  totals: Total[];
}

const initialState: DashboardState = {
  status: ApiStatus.Idle,
  totals: [],
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTotals.pending, (state) => {
        state.status = ApiStatus.Loading;
      })
      .addCase(fetchTotals.fulfilled, (state, action) => {
        state.status = ApiStatus.Succeeded;
        state.totals = action.payload;
      })
      .addCase(fetchTotals.rejected, (state) => {
        state.status = ApiStatus.Failed;
        state.totals = [];
      });
  },
});

export const fetchTotals = createAsyncThunk('dashboard/fetchTotals', async () => {
  return await getAmounts();
});

export const selectTotals = (state: RootState) => state.dashboard.totals;
export const selectDashboardStatus = (state: RootState) => state.dashboard.status;

export const {} = dashboardSlice.actions;
export default dashboardSlice.reducer; 
