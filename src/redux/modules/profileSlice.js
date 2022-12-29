import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../shared/cookie";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://mylee.site/",
  headers: {
    authorization: `Bearer ${getCookie("token")}`,
  },
});

const initialState = { posts: null };

export const __tokenCheck = createAsyncThunk(
  "profileSlice/tokenCheck",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get("/api/auth/login/tokencheck");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const __getUserInfo = createAsyncThunk(
//   "profile/getuserInfo",
//   async (payload, thunkAPI) => {
//     try {
//       const { data } = await instance.get(`/api/post/${nickname}`, payload);

//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const __getPosts = createAsyncThunk(
  "mainSlice/getPosts",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get("/api/post");
      return thunkAPI.fulfillWithValue(data);
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
      state.data = action.payload;
    },
    [__tokenCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // [__getUserInfo.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__getUserInfo.fulfilled]: (state, action) => {
    //   state.data = action.payload;
    //   state.isLoading = false;
    //   state.isLogin = true;
    // },
    // [__getUserInfo.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    [__getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPosts.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isLogin = true;
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default profileSlice.reducer;
