import { createSlice } from '@reduxjs/toolkit';
import { getDoctorAll } from '../services/redux-service';

export const doctorSlice = createSlice({
  name: "postpones",
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getDoctorAll.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default doctorSlice.reducer;