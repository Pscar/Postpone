import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';


export const createSchedule = createAsyncThunk("schedules/createSchedule", async (schedules) => {
  const response = await axios.post(`${baseURL}/schedule/create`, schedules);
  return response.data.data
});

export const updateScheduleById = createAsyncThunk("schedules/updateScheduleById", async (Id, schedules) => {
  const response = await axios.put(`${baseURL}/schedule/editbyid`, Id, schedules);
  return response.data.data
});

export const deleteScheduleById = createAsyncThunk("schedules/deleteScheduleeById", async (Id) => {
  const response = await axios.delete(`${baseURL}/schedule/deletebyid?Id=${Id}`);
  return response
});

export const getScheduleAll = createAsyncThunk("schedules/getScheduleAll", async () => {
  const response = await axios.get(`${baseURL}/schedule/get`);
  return response.data.data;
});