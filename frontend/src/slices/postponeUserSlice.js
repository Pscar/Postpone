import { createSlice } from '@reduxjs/toolkit';
import { createPostPone, getPostPoneNow, updatePostPoneById, getPostPoneAll } from '../services/redux-service';


export const postPoneSlice = createSlice({
  name: "postpones",
  initialState: {
    postpones: [],
    postponesEdit: [],
    postponesAll: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [createPostPone.fulfilled]: (state, action) => {
      state.postpones.push(...action.payload);
    },
    [updatePostPoneById.fulfilled]: (state, action) => {
      state.postponesEdit.push(action.payload);
    },
    [getPostPoneNow.fulfilled]: (state, action) => {
      state.postpones = action.payload;
    },
    [getPostPoneAll.fulfilled]: (state, action) => {
      return action.payload.postponesAll;
    },
  },
});

export default postPoneSlice.reducer;