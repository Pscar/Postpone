import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';

export const getDoctorAll = createAsyncThunk("doctors/getDoctorAll", async () => {
  const response = await axios.get(`${baseURL}/doctor`);
  return response.data.data
});