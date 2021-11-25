import { configureStore } from '@reduxjs/toolkit'
import appointmentSlice from '../slices/appointmentUserSlice';
import patientSlice from '../slices/patientSlice';
import loginSlice from '../slices/LoginSlice';
import doctorSlice from '../slices/doctorSlice';
import scheduleSlice from '../slices/scheduleSlice';

const reducer = {
  appointment: appointmentSlice,
  doctors: doctorSlice,
  schedules: scheduleSlice,
  logins: loginSlice,
  patients: patientSlice
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
})

