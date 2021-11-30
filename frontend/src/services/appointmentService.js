import axiosInstance from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createAppointment = createAsyncThunk("createAppointment", async (appointments) => {
  const response = await axiosInstance.post(`/appointments`, appointments);
  return response.data.data
});

export const updateAppointmentById = createAsyncThunk("updateAppointmentById", async (appointments_id, appointments) => {
  const response = await axiosInstance.put(`/appointments/${appointments_id}`, appointments_id, appointments);
  return response.data.data
});

export const deleteAppointmentById = createAsyncThunk("deleteAppointmentById", async (appointments_id) => {
  const response = await axiosInstance.delete(`/appointments/${appointments_id}`);
  return response
});

export const getAppointmentNow = createAsyncThunk("getAppointmentNow", async () => {
  const response = await axiosInstance.get(`/appointments/now`);
  return response.data.data
});


export const getAppointmentAll = createAsyncThunk("getAppointmentAll", async () => {
  const response = await axiosInstance.get(`/appointments`);
  return response.data.data
});

export const getAppointmentById = async (appointments_id) => {
  const response = await axiosInstance.get(`/appointments/${appointments_id}`)
  return response
}