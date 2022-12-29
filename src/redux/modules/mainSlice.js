import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { configure } from "@testing-library/react";
import axios from "axios";
import { getCookie } from "../../shared/cookie";

const instance = axios.create({
  baseURL: "https://mylee.site/",
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

//전체 게시글 조회
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

//게시글 생성
export const __addPost = createAsyncThunk(
  "mainSlice/addPost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("/api/post", payload);
      if (response.status === 201) {
        const { data } = await instance.get("/api/post");
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//게시글 삭제
export const __deletePost = createAsyncThunk(
  "mainSlice/deletePost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/api/post/${payload}`);
      if (response.status === 201) {
        const { data } = await instance.get("/api/post");
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

//게시글 업데이트
export const __updatePost = createAsyncThunk(
  "mainSlice/updatePost",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.patch(`/api/post/${payload.id}`, {
        content: payload.content,
      });
      if (response.status === 201) {
        const { data } = await instance.get("/api/post");
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: {
    //게시글 조회 extraReducer
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
    //게시글 생성 extraReducer
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
    //게시글 삭제 extraReducer
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__deletePost.rejected]: (state, action) => {
      window.alert(action.payload);
    },
    //게시글 수정 extraReducer
    [__updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePost.fulfilled]: (state, action) => {
      // state.isLoading = false;
      state.data = action.payload;
    },
    [__updatePost.rejected]: (state, action) => {
      window.alert(action.payload);
    },
  },
});

export default mainSlice.reducer;
