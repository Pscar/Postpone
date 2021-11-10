import { configureStore } from '@reduxjs/toolkit'
import postponeUserSlice from '../slices/postponeUserSlice';
import userLoginSlice from '../slices/userLoginSlice';
import doctorSlice from '../slices/doctorSlice';
import scheduleSlice from '../slices/scheduleSlice';
//object แสดงผล frontend
const reducer = {
  postpones: postponeUserSlice,
  doctors: doctorSlice,
  schedules:scheduleSlice,
  users: userLoginSlice
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
})

