import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';


export const createPostPone = createAsyncThunk(
  "postpones/createPostPone",
  async (postpones) => (await axios.post(`${baseURL}/postpone/create`, postpones)).data.data
);
export const createSchedule = createAsyncThunk(
  "schedules/createSchedule",
  async (schedules) => (await axios.post(`${baseURL}/schedule/create`, schedules)).data.data
);

export const updatePostPoneById = createAsyncThunk(
  "postpones/updatePostPoneById",
  async (postpone_id, postpones) => (await axios.put(`${baseURL}/postpone/editbyid`, postpone_id, postpones)).data.data
);

export const updateScheduleById = createAsyncThunk(
  "schedules/updateScheduleeById",
  async (Id, schedules) => (await axios.put(`${baseURL}/schedule/editbyid`, Id, schedules)).data.data
);


export const deletePostPoneById = createAsyncThunk(
  "postpones/deletePostPoneById",
  async (postpone_id) => (await axios.delete(`${baseURL}/postpone/deletebyid?postpone_id=${postpone_id}`))
)

export const deleteScheduleById = createAsyncThunk(
  "schedules/deleteScheduleeById",
  async (Id) => (await axios.delete(`${baseURL}/schedule/deletebyid?Id=${Id}`))
)

export const getPostPoneNow = createAsyncThunk(
  "postpones/getPostPoneNow",
  async () => (await axios.get(`${baseURL}/postpone/now`)).data.data
);

export const getPostPoneAll = createAsyncThunk(
  "postpones/getPostPoneAll",
  async () => (await axios.get(`${baseURL}/postpone/get`)).data.data
);


export const getScheduleAll = createAsyncThunk(
  "schedules/getScheduleAll",
  async () => (await axios.get(`${baseURL}/schedule/get`)).data.data
);



export const getDoctorAll = createAsyncThunk(
  "doctors/getDoctorAll",
  async () => (await axios.get(`${baseURL}/doctor/get`)).data.data
);



export const getUserAll = createAsyncThunk(
  "users/getUserAll",
  async () => (await axios.get(`${baseURL}/user/get`)).data
);