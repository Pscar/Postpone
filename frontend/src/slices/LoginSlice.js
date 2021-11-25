import { createSlice } from '@reduxjs/toolkit'

const initialLogin = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : null


const loginSlice = createSlice({
  name: 'login',
  initialState: {
    login: initialLogin,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.login = action.payload;
      localStorage.setItem('login', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) => {
      state.login = null;
      localStorage.removeItem('login')
    },
  },
});

export const { loginSuccess, logoutSuccess } = loginSlice.actions

export default loginSlice.reducer
