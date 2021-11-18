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
      state.postpones.push(action.payload);
    },
    [updatePostPoneById.fulfilled]: (state, action) => {
      state = {
        loading: true,
        postponesEdit: action.payload,
        error: {}
      }
    },
    [deletePostPoneById.fulfilled]: (state, action) => {
      state = {
        loading: true,
        state: action.payload,
        error: {}
      }
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