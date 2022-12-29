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

export const __postComment = createAsyncThunk(
  "mainSlice/postComment",
  async (payload, thunkAPI) => {
    console.log(getCookie("token"));
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
      // return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __patchComment = createAsyncThunk(
  "mainSlice/patchComment",
  async (payload, thunkAPI) => {
    console.log(payload);
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
      console.log(res);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "mainSlice/deleteComment",
  async (payload, thunkAPI) => {
    try {
      const res = await instance.delete(`/api/comment/${payload.commentId}`, {
        headers: {
          authorization: `Bearer ${getCookie("token")}`,
        },
      });
      console.log(res);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      console.log(response.data);
      // if (response.status === 201) {
      //   const res = await instance.get("/api/post");
      //   console.log(res.data);
      //   return thunkAPI.fulfillWithValue(res.data);
      // }
      return thunkAPI.fulfillWithValue(response);
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

    //성재
    //post
    [__postComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postComment.fulfilled]: (state, action) => {
      // state.posts = [...state.posts, { content: action.payload.comment }]; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.posts = action.payload;
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
      console.log("qq");
      state.posts = state.posts?.map((value, index) => {
        if (value.postId === action.payload.postId) {
          const newComment = value.comments?.map((comment, index) => {
            if (comment.commentId === action.payload.commentId) {
              console.log(action.payload);
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
      console.log("dd");
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
      // state.data = action.payload;
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__deleteComment.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
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
