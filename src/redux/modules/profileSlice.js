import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/cookie";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://mylee.site/",
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
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __getMyPost = createAsyncThunk(
  "profileSlice/getMyPost",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const res = await instance.get(`/api/post/${payload}`);
      console.log(res);
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
      console.log(action.payload);
      state.data = action.payload;
    },
    [__getMyPost.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // [__getPosts.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__getPosts.fulfilled]: (state, action) => {
    //   state.data = action.payload;
    //   state.isLoading = false;
    //   state.isLogin = true;
    // },
    // [__getPosts.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});
export default profileSlice.reducer;
