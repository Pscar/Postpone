import { createSlice } from '@reduxjs/toolkit';
import { createPostPone, getPostPoneNow, updatePostPoneById, getPostPoneAll } from '../services/redux-service';


export const postPoneSlice = createSlice({
  name: "postpones",
  initialState: {
    postpones: [],
    postponesEdit: [],
    postponesEditForm: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [createPostPone.fulfilled]: (state, action) => {
      state.postpones.shift(action.payload);
    },
    [updatePostPoneById.fulfilled]: (state, action) => {
    console.log("🚀 ~ file: postponeUserSlice.js ~ line 19 ~ state", action)
      state.postponesEdit.push(action.payload);
    },
    [getPostPoneNow.fulfilled]: (state, action) => {
      state.postpones = action.payload;
    },
    [getPostPoneAll.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default postPoneSlice.reducer;