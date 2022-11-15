import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {},
  reducers: {
    successToast: (state, action) => {
      toast.success(action.payload);
      return {
        ...state
      }
    },
    errorToast: (state, action) => {
      toast.error(action.payload, {
        autoClose: false,
      });
      return {
        ...state
      }
    }
  }
});

export const { successToast, errorToast } = toastSlice.actions;

export default toastSlice.reducer;