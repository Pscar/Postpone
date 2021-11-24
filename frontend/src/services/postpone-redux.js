import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';


export const createPostPone = createAsyncThunk("postpones/createPostPone", async (postpones) => {
  const response = await axios.post(`${baseURL}/postpone`, postpones);
  return response.data.data
});

export const updatePostPoneById = createAsyncThunk("postpones/updatePostPoneById", async (appointments_id, postpones) => {
  const response = await axios.put(`${baseURL}/postpone/${appointments_id}`, appointments_id, postpones);
  return response.data.data
});

export const deletePostPoneById = createAsyncThunk("postpones/deletePostPoneById", async (appointments_id) => {
  const response = await axios.delete(`${baseURL}/postpone/${appointments_id}`);
  return response
});

export const getPostPoneNow = createAsyncThunk("postpones/getPostPoneNow", async () => {
  const response = await axios.get(`${baseURL}/postpone/now`);
  return response.data.data
});


export const getPostPoneAll = createAsyncThunk("postpones/getPostPoneAll", async () => {
  const response = await axios.get(`${baseURL}/postpone`);
  return response.data.data
});

export const getPostPonesById = async (appointments_id) => {
  const response = await axios.get(`${baseURL}/postpone/${appointments_id}`)
  return response
}