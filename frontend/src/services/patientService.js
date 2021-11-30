import axiosInstance from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPatient = createAsyncThunk("createPatient", async (patients) => {
  const response = await axiosInstance.post(`/patients`, patients);
  return response.data.data
});
export const getPatientAll = createAsyncThunk("getPatientAll", async () => {
  const response = await axiosInstance.get(`/patients`);
  return response.data.data
});
