import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';

export const getDoctorAll = createAsyncThunk("getDoctorAll", async () => {
  const response = await axios.get(`${baseURL}/doctors`);
  return response.data.data
});