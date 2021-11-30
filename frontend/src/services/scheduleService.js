import axiosInstance from "./axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSchedule = createAsyncThunk("createSchedule", async (schedules) => {
  const response = await axiosInstance.post(`/schedules`, schedules);
  return response.data.data
});

export const updateScheduleById = createAsyncThunk("updateScheduleById", async (schedule_id, schedules) => {
  const response = await axiosInstance.put(`/schedules/${schedule_id}`, schedule_id, schedules);
  return response.data.data
});

export const deleteScheduleById = createAsyncThunk("deleteScheduleeById", async (schedule_id) => {
  const response = await axiosInstance.delete(`/schedules/${schedule_id}`);
  return response
});

export const getScheduleAll = createAsyncThunk("getScheduleAll", async () => {
  const response = await axiosInstance.get(`/schedules`);
  return response.data.data;
});