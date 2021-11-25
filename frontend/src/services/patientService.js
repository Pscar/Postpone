import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';

export const createPatient = createAsyncThunk("createPatient", async (patients) => {
  const response = await axios.post(`${baseURL}/user`, patients);
  return response.data.data
});
export const getPatientAll = createAsyncThunk("getPatientAll", async () => {
  const response = await axios.get(`${baseURL}/user`);
  return response.data.data
});
