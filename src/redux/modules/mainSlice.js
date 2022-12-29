import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../shared/cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_MY_API,
  headers: {
    authorization: `Bearer ${getCookie("token")}`,
  },
});

const initialState = {
  posts: [
    {
      postId: 0,
      userId: 0,
      nickname: "",
      image: "",
      content: "",
      comentsCount: 0,
      likesCount: 0,
      profileImg: "",
      comments: [
        {
          postId: 0,
          userId: 0,
          nickname: "",
          comment: "",
          commentId: "",
        },
      ],
    },
  ],
};

//전체 게시글 조회
export const __getPosts = createAsyncThunk(
  "mainSlice/getPosts",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.get("/api/post");
      return thunkAPI.fulfillWithValue(res.data.posts);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
        return thunkAPI.fulfillWithValue(data.posts);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//댓글 생성
export const __postComment = createAsyncThunk(
  "mainSlice/postComment",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.post(
        `/api/comment/${payload.id}`,
        {
          comment: payload.comment,
        },
        {
          headers: {
            authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (res.status === 201) {
        const { data } = await instance.get("/api/post");
        return thunkAPI.fulfillWithValue(data.posts);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//댓글 수정
export const __patchComment = createAsyncThunk(
  "mainSlice/patchComment",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.patch(
        `/api/comment/${payload.commentId}`,
        {
          comment: payload.comment,
        },
        {
          headers: {
            authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//댓글 삭제
export const __deleteComment = createAsyncThunk(
  "mainSlice/deleteComment",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.delete(`/api/comment/${payload.commentId}`, {
        headers: {
          authorization: `Bearer ${getCookie("token")}`,
        },
      });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
        return thunkAPI.fulfillWithValue(data.posts);
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
        const res = await instance.get("/api/post");
        return thunkAPI.fulfillWithValue(res.data.posts);
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
      state.posts = action.payload;
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
      state.posts = action.payload;
    },
    [__addPost.rejected]: (state, action) => {
      state.error = action.payload;
    },

    //댓글 post
    [__postComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComment.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    [__postComment.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //댓글patch
    [__patchComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__patchComment.fulfilled]: (state, action) => {
      state.posts = state.posts?.map((value, index) => {
        if (value.postId === action.payload.postId) {
          const newComment = value.comments?.map((comment, index) => {
            if (comment.commentId === action.payload.commentId) {
              return { ...comment, comment: action.payload.comment };
            } else {
              return comment;
            }
          });
          return { ...value, comments: newComment };
        } else {
          return value;
        }
      });
      state.isLoading = false;
    },
    [__patchComment.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //댓글 del
    [__deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.posts = state.posts?.map((value, index) => {
        if (value.postId === action.payload.postId) {
          const newComment = value.comments?.filter(
            (comment, index) => action.payload.commentId !== comment.commentId
          );
          return { ...value, comments: newComment };
        } else {
          return value;
        }
      });
      state.isLoading = false;
    },
    [__deleteComment.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //게시글 삭제 extraReducer
    [__deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
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
      state.posts = action.payload;
    },
    [__updatePost.rejected]: (state, action) => {
      window.alert(action.payload);
    },
  },
});

export default mainSlice.reducer;
