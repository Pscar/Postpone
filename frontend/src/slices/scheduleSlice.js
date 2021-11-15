import { createSlice } from '@reduxjs/toolkit';
import { getScheduleAll, createSchedule, updateScheduleById, deleteScheduleById } from '../services/redux-service';


export const scheduleSlice = createSlice({
  name: "schedules",
  initialState: {
    schedules: [],
    schedulesEdit: [],
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
        schedulesEdit: action.payload,
        error: {}
      }
      console.log(state)
    },
    [deleteScheduleById.fulfilled]: (state, action) => {
      let index = state.findIndex(({ Id }) => Id === action.payload.Id);
      state.splice(index, 1);
    },
    [getScheduleAll.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

export default scheduleSlice.reducer;