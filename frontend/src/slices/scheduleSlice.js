import { createSlice } from '@reduxjs/toolkit';
import { getScheduleAll } from '../services/redux-service';


export const scheduleSlice = createSlice({
  name: "schedules",
  initialState: {
    schedules: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getScheduleAll.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default scheduleSlice.reducer;