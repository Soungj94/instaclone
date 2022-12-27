import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configure } from "@testing-library/react";
import axios from "axios";
import { getCookie } from "../../shared/cookie";

const instance = axios.create({
  baseURL: "http://13.124.82.69",
  headers: {
    authorization: `Bearer ${getCookie("token")}`,
  },
});

const initialState = {
  posts: null,
};

// 서버에 요청 전달되기 전에 수행하는 작업(토큰 헤더에 보내기)
// 이렇게하면 청크함수에 하나하나 토큰 실어서 보낼 필요 없음
// instance.interceptors.request.use(async (config) => {
//   config.headers["Authorization"] = getCookie("token");
//   return config;
// });

//청크 사용 구역
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

//card post하는 청크
export const __addPost = createAsyncThunk(
  "mainSlice/addPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("/api/post", payload);
      console.log(response);
      if (response.status === 201) {
        window.alert(response.data.message);
        const { data } = await instance.get("/api/post");
        window.location.replace("http://localhost:3000/");
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//포스트 할 때 필요한 사용자 닉네임 가져오기 위해 백에 api서버하나 더만들기보다는
//기존에 있던 게시글 상세 조회 api 사용
// export const __getUserInfo = createAsyncThunk(
//   "main/postCard",
//   async(payload, thunkAPI) => {
//     try{
//       const res = await instance.get("api/post")

//     } catch (error) {
//       return error
//     }
//   }
// )

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: {
    [__getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPosts.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__addPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default mainSlice.reducer;
