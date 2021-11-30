import axiosInstance from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getDoctorAll = createAsyncThunk("getDoctorAll", async () => {
  const response = await axiosInstance.get(`/doctors`);
  return response.data.data
});