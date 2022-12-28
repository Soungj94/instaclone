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
  posts: [
    {
      postId: Number,
      userId: Number,
      nickname: "",
      image: "",
      content: "",
      comentsCount: Number,
      likesCount: Number,
      profileImg: "",
      comments: [
        {
          postId: Number,
          userId: Number,
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
export const __getPosts = createAsyncThunk(
  "mainSlice/getPosts",
  async (payload, thunkAPI) => {
    try {
      const { data } = await instance.get("/api/post");
      console.log(data);
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

export const __postComment = createAsyncThunk(
  "POST_POST",
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
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const __patchComment = createAsyncThunk(
  "PATCH_POST",
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
      console.log(res);
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

    //성재
    //post
    [__postComment.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postComment.fulfilled]: (state, action) => {
      state.posts = [...state.posts, { content: action.payload.comment }]; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
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
      state.posts = state.posts?.map((value, index) => {
        if (value.postId === action.payload.postId) {
          const newComment = value.comments?.map((comment, index) => {
            if (comment.id === action.payload.commentId) {
              return { ...comment, id: action.payload.commentId };
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
      state.posts = state.posts?.map((value, index) => {
        if (value.postId === action.payload.postId) {
          const newComment = value.comments?.filter((comment, index) => {
            if (comment.id === action.payload.commentId) {
              return { ...comment, id: action.payload.commentId };
            } else {
              return comment;
            }
          });
          return { ...value, comments: newComment };
        } else {
          return value;
        }
      });
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__deleteComment.rejected]: (state, action) => {
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
    },
  },
});

export default mainSlice.reducer;
