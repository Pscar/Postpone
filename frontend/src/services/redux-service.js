import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';


export const createPostPone = createAsyncThunk(
  "postpones/createPostPone",
  async (postpones) => await (await axios.post(`${baseURL}/postpone/create`, postpones)).data.data
);
export const updatePostPoneById = createAsyncThunk(
  "postpones/updatePostPoneById",
  async (postpone_id, postpones) => await (await axios.post(`${baseURL}/postpone/editbyid`, postpone_id, postpones)).data.data
);
export const getPostPoneNow = createAsyncThunk(
  "postpones/getPostponeNow",
  async () => await (await axios.get(`${baseURL}/postpone/now`)).data.data
);
export const getUserAll = createAsyncThunk(
  "postpones/getuser",
  async () => await (await axios.get(`${baseURL}/user/get`)).data.data
);