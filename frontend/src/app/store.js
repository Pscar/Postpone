import { configureStore } from '@reduxjs/toolkit'
import postponeUserSlice from '../slices/postponeUserSlice';
import userLoginSlice from '../slices/userLoginSlice';
//object แสดงผล frontend
const reducer = {
  postpones: postponeUserSlice,
  users: userLoginSlice
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
})

