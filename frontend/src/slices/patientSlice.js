import { createSlice } from '@reduxjs/toolkit';
import { createPatient, getPatientAll } from '../services/patientService';


export const patientSlice = createSlice({
  name: "patients",
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: {
    [createPatient.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getPatientAll.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default patientSlice.reducer;