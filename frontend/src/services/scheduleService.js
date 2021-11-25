import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';


export const createSchedule = createAsyncThunk("createSchedule", async (schedules) => {
  const response = await axios.post(`${baseURL}/schedule`, schedules);
  return response.data.data
});

export const updateScheduleById = createAsyncThunk("updateScheduleById", async (schedule_id, schedules) => {
  const response = await axios.put(`${baseURL}/schedule/${schedule_id}`, schedule_id, schedules);
  return response.data.data
});

export const deleteScheduleById = createAsyncThunk("deleteScheduleeById", async (schedule_id) => {
  const response = await axios.delete(`${baseURL}/schedule/${schedule_id}`);
  return response
});

export const getScheduleAll = createAsyncThunk("getScheduleAll", async () => {
  const response = await axios.get(`${baseURL}/schedule/get`);
  return response.data.data;
});