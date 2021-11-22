import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = 'http://localhost:5000/api';


export const createPostPone = createAsyncThunk("postpones/createPostPone", async (postpones) => {
  const response = await axios.post(`${baseURL}/postpone/create`, postpones);
  return response.data.data
});

export const updatePostPoneById = createAsyncThunk("postpones/updatePostPoneById", async (postpone_id, postpones) => {
  const response = await axios.put(`${baseURL}/postpone/editbyid`, postpone_id, postpones);
  return response.data.data
});

export const deletePostPoneById = createAsyncThunk("postpones/deletePostPoneById", async (postpone_id) => {
  const response = await axios.delete(`${baseURL}/postpone/deletebyid?postpone_id=${postpone_id}`);
  return response
});

export const getPostPoneNow = createAsyncThunk("postpones/getPostPoneNow", async () => {
  const response = await axios.get(`${baseURL}/postpone/now`);
  return response.data.data
});


export const getPostPoneAll = createAsyncThunk("postpones/getPostPoneAll", async () => {
  const response = await axios.get(`${baseURL}/postpone/get`);
  return response.data.data
});

export const getPostPonesById = async (postpone_id) => {
  const response = await axios.get(`${baseURL}/postpone/getbyid?postpone_id=${postpone_id}`)
  return response
}