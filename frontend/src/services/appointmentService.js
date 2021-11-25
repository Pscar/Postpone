import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';


export const createAppointment = createAsyncThunk("createAppointment", async (appointments) => {
  const response = await axios.post(`${baseURL}/appointments`, appointments);
  return response.data.data
});

export const updateAppointmentById = createAsyncThunk("updateAppointmentById", async (appointments_id, postpones) => {
  const response = await axios.put(`${baseURL}/appointments/${appointments_id}`, appointments_id, postpones);
  return response.data.data
});

export const deleteAppointmentById = createAsyncThunk("deleteAppointmentById", async (appointments_id) => {
  const response = await axios.delete(`${baseURL}/appointments/${appointments_id}`);
  return response
});

export const getAppointmentNow = createAsyncThunk("getAppointmentNow", async () => {
  const response = await axios.get(`${baseURL}/appointments/now`);
  return response.data.data
});


export const getAppointmentAll = createAsyncThunk("getAppointmentAll", async () => {
  const response = await axios.get(`${baseURL}/appointments`);
  return response.data.data
});

export const getAppointmentById = async (appointments_id) => {
  const response = await axios.get(`${baseURL}/appointment/${appointments_id}`)
  return response
}