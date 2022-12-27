import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configure } from "@testing-library/react";
import axios from "axios";
import { instance } from "../../instance/instance";

const initialState = {
  posts: [],
};

//토큰 처리 구역
// const getToken = () => {
//   const token = /*쿠키에 있는 토큰 가져오는 로직*/
//   return token ? `${token}` : null;
// }

// 서버에 요청 전달되기 전에 수행하는 작업(토큰 헤더에 보내기)
// 이렇게하면 청크함수에 하나하나 토큰 실어서 보낼 필요 없음
// instance.interceptors.request.use(async(config) => {
//   config.headers["Authorization"] = getToken();
//   return config
// })

//청크 사용 구역

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default mainSlice.reducer;
