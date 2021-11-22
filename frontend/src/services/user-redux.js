import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';

export const getUserAll = createAsyncThunk("users/getUserAll", async () => {
  const response = await axios.get(`${baseURL}/user/get`);
  return response.data
});