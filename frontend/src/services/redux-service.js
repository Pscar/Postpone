import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';


export const createPostPone = createAsyncThunk("postpones/createPostPone", async (postpones) => {
  const response = await axios.post(`${baseURL}/postpone/create`, postpones);
  return response.data.data
});

export const createSchedule = createAsyncThunk("schedules/createSchedule", async (schedules) => {
  const response = await axios.post(`${baseURL}/schedule/create`, schedules);
  return response.data.data
});

export const updatePostPoneById = createAsyncThunk("postpones/updatePostPoneById", async (postpone_id, postpones) => {
  const response = await axios.put(`${baseURL}/postpone/editbyid`, postpone_id, postpones);
  return response.data.data
});

export const updateScheduleById = createAsyncThunk("schedules/updateScheduleById", async (Id, schedules) => {
  const response = await axios.put(`${baseURL}/schedule/editbyid`, Id, schedules);
  return response.data.data
});

export const deletePostPoneById = createAsyncThunk("postpones/deletePostPoneById", async (postpone_id) => {
  const response = await axios.delete(`${baseURL}/postpone/deletebyid?postpone_id=${postpone_id}`);
  return response
});

export const deleteScheduleById = createAsyncThunk("schedules/deleteScheduleeById", async (Id) => {
  const response = await axios.delete(`${baseURL}/schedule/deletebyid?Id=${Id}`);
  return response
});

export const getPostPoneNow = createAsyncThunk("postpones/getPostPoneNow", async () => {
  const response = await axios.get(`${baseURL}/postpone/now`);
  return response.data.data
});


export const getPostPoneAll = createAsyncThunk("postpones/getPostPoneAll", async () => {
  const response = await axios.get(`${baseURL}/postpone/get`);
  return response.data.data
});

export const getScheduleAll = createAsyncThunk("schedules/getScheduleAll", async () => {
  const response = await axios.get(`${baseURL}/schedule/get`);
  return response.data.data;
});

export const getDoctorAll = createAsyncThunk("doctors/getDoctorAll", async () => {
  const response = await axios.get(`${baseURL}/doctor/get`);
  return response.data.data
});

export const getUserAll = createAsyncThunk("users/getUserAll", async () => {
  const response = await axios.get(`${baseURL}/user/get`);
  return response.data
});