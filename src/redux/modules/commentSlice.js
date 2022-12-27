import { instance } from "../../instnace/instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentList: [],
  isLoading: false,
  error: null,
};

export const __getComment = createAsyncThunk(
  "GET_POST",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/post/detail/:${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __postComment = createAsyncThunk(
  "POST_POST",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.post(`/api/comment/:${payload}`, {
        comment: payload.comment,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
console.log("🚀 ~ file: commentSlice.js:32 ~ __postComment", __postComment);

export const __patchComment = createAsyncThunk(
  "PATCH_POST",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.patch(`/api/comment/:commentId`, {
        //여기에 댓글이 위치한 directory 찾기
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "DEL_POST",
  async (payload, thunkAPI) => {
    try {
      const data = await instance.delete(`/api/comment/:commentId`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "COMMENT_SLICE",
  initialState,
  reducers: {},
  extraReducers: {
    //get
    [__getComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComment.fulfilled]: (state, action) => {
      state.commentList = action.payload.comments; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__getComment.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    //post
    [__postComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postComment.fulfilled]: (state, action) => {
      state.commentList = [...state.commentList, { content: action.payload }]; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      //   console.log("pt", action.payload);
    },
    [__postComment.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    //patch
    [__patchComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__patchComment.fulfilled]: (state, action) => {
      state.commentList = state.commentList.map((el) =>
        el.id === action.payload.id
          ? { ...el, content: action.payload.inputChange }
          : el
      );
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__patchComment.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    //del
    [__deleteComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentList = state.commentList.filter(
        (data) => data.commentId !== action.payload
      );
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__deleteComment.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    },
  },
});
export const { data } = commentSlice.actions;
export default commentSlice.reducer;
