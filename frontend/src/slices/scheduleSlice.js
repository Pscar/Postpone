import { createSlice } from '@reduxjs/toolkit';
import { getScheduleAll, createSchedule, updateScheduleById, deleteScheduleById } from '../services/schedule-redux';


export const scheduleSlice = createSlice({
  name: "schedules",
  initialState: {
    loading: false,
    error: null,
  },
  extraReducers: {
    [createSchedule.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [updateScheduleById.fulfilled]: (state, action) => {
      state = {
        loading: true,
        state: action.payload,
        error: {}
      }
    },
    [deleteScheduleById.fulfilled]: (state, action) => {
      state.splice(state.findIndex((Id) => Id === action.payload));

    },
    [getScheduleAll.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

export default scheduleSlice.reducer;