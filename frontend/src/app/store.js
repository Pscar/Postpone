import { configureStore } from '@reduxjs/toolkit'
import postponeUserSlice from '../slices/postponeUserSlice';

//object แสดงผล frontend
const reducer = {
  postpones: postponeUserSlice
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
})

