import { createSlice } from '@reduxjs/toolkit';
import { createAppointment, updateAppointmentById, deleteAppointmentById, getAppointmentNow, getAppointmentAll } from '../services/appointment-redux';


export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [createAppointment.fulfilled]: (state, action) => {
      state.appointment.push(action.payload);
    },
    [updateAppointmentById.fulfilled]: (state, action) => {
      state = {
        loading: true,
        state: action.payload,
        error: {}
      }
    },
    [deleteAppointmentById.fulfilled]: (state, action) => {
      state = {
        loading: true,
        state: action.payload,
        error: {}
      }
    },
    [getAppointmentNow.fulfilled]: (state, action) => {
      state.appointment = action.payload;
    },
    [getAppointmentAll.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default appointmentSlice.reducer;