import axiosInstance from "./axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSchedule = createAsyncThunk("createSchedule", async (schedules) => {
  const response = await axiosInstance.post(`/schedules`, schedules);
  return response.data.data
});

export const updateScheduleById = createAsyncThunk("updateScheduleById", async (scheduleId, schedules) => {
  const response = await axiosInstance.put(`/schedules/${scheduleId}`, scheduleId, schedules);
  return response.data.data
});

export const deleteScheduleById = createAsyncThunk("deleteScheduleeById", async (scheduleId) => {
  const response = await axiosInstance.delete(`/schedules/${scheduleId}`);
  return response
});

export const getScheduleAll = createAsyncThunk("getScheduleAll", async () => {
  const response = await axiosInstance.get(`/schedules`);
  return response.data.data;
});