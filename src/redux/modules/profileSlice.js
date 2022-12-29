import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/cookie";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
  headers: {
    authorization: `Bearer ${getCookie("token")}`,
  },
});

const initialState = { user: null };

export const __tokenCheck = createAsyncThunk(
  "profileSlice/tokenCheck",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.get("/api/auth/login/tokencheck");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __getMyPost = createAsyncThunk(
  "profileSlice/getMyPost",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.get(`/api/post/${payload}`);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//리듀서
const profileSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    [__tokenCheck.pending]: (state) => {
      state.isLoading = true;
    },
    [__tokenCheck.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [__tokenCheck.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [__getMyPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyPost.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__getMyPost.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
export default profileSlice.reducer;
