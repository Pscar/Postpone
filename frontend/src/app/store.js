import { configureStore } from '@reduxjs/toolkit'
import appointmentSlice from '../slices/appointmentUserSlice';
import userLoginSlice from '../slices/userLoginSlice';
import doctorSlice from '../slices/doctorSlice';
import scheduleSlice from '../slices/scheduleSlice';
//object แสดงผล frontend
const reducer = {
  appointment: appointmentSlice,
  doctors: doctorSlice,
  schedules:scheduleSlice,
  users: userLoginSlice
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
})

