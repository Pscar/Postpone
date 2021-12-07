import axiosInstance from "./axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createAppointment = createAsyncThunk("createAppointment", async (appointments) => {
  const response = await axiosInstance.post(`/appointments`, appointments);
  return response.data.data
});

export const updateAppointmentById = createAsyncThunk("updateAppointmentById", async (appointmentsId, appointments) => {
  const response = await axiosInstance.put(`/appointments/${appointmentsId}`, appointmentsId, appointments);
  return response.data.data
});

export const deleteAppointmentById = createAsyncThunk("deleteAppointmentById", async (appointmentsId) => {
  const response = await axiosInstance.delete(`/appointments/${appointmentsId}`);
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

export const getAppointmentById = async (appointmentsId) => {
  const response = await axiosInstance.get(`/appointments/${appointmentsId}`)
  return response
}