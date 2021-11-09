import { createSlice } from '@reduxjs/toolkit';
import { createPostPone, getPostPoneNow, updatePostPoneById, deletePostPoneById, getPostPoneAll } from '../services/redux-service';


export const postPoneSlice = createSlice({
  name: "postpones",
  initialState: {
    postpones: [],
    postponesEdit: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [createPostPone.fulfilled]: (state, action) => {
      state.postpones.shift(action.payload);
    },
    [updatePostPoneById.fulfilled]: (state, action) => {
      state.postponesEdit.push(action.payload);
    },
    [deletePostPoneById.fulfilled]: (state, action) => {
      let index = state.findIndex(({ postpone_id }) => postpone_id === action.payload.postpone_id);
      state.splice(index, 1);
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