import { createSlice } from '@reduxjs/toolkit';
import { getDoctorAll } from '../services/doctor-redux';

export const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getDoctorAll.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    
  },
});

export default doctorSlice.reducer;