import { createSlice } from '@reduxjs/toolkit'
import { getUserAll } from '../services/redux-service';
const initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null


const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: initialUser,
    dataUsers: []
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.users = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) => {
      state.users = null;
      localStorage.removeItem('user')
    },
  },
  extraReducers: {
    [getUserAll.fulfilled]: (state, action) => {
      state.dataUsers = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions

export default userSlice.reducer
