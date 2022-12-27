import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../instnace/instance";
import { setCookie } from "../../shared/cookie";

const initialState = {
  email: "",
  nickname: "",
  password: "",
  confirm: "",
  dupCheck: false,
  nickCheck: false,
  isLoading: false,
  error: null,
  isLogin: false,
  isSignup: false,
};

//회원가입 post
export const __signUp = createAsyncThunk(
  "user/signUp",
  async (payload, thunkAPI) => {
    console.log("🚀 ~ file: userSlice.js:15 ~ payload", payload);
    try {
      const res = await instance.post("/api/auth/signup", payload);
      console.log("🚀 ~ file: userSlice.js:25 ~ res", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      window.alert("회원가입에 실패했습니다.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// ID 중복확인 POST
export const __postDupEmail = createAsyncThunk(
  "user/dupEmail",
  async (payload, thunkAPI) => {
    console.log("🚀 ~ file: userSlice.js:37 ~ payload", payload);
    try {
      const res = await instance.post("/api/auth/signup/checkId", payload);
      console.log("🚀 ~ file: userSlice.js:43 ~ res", res.data);
      window.alert("사용 가능한 ID입니다.");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      window.alert("중복된 ID가 있습니다.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Nickname 중복확인 POST
export const __postDupNickname = createAsyncThunk(
  "user/nickname",
  async (payload, thunkAPI) => {
    console.log("🚀 ~ file: userSlice.js:57 ~ payload", payload);
    try {
      const res = await instance.post(
        "/api/auth/signup/checkNickname",
        payload
      );
      window.alert("사용 가능한 닉네임입니다.");
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      window.alert("중복된 닉네임이 있습니다.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//로그인 POST
export const __postLogin = createAsyncThunk(
  "user/postLogin",
  async (payload, thunkAPI) => {
    console.log("🚀 ~ file: userSlice.js:78 ~ payload", payload);
    try {
      setCookie();
      const res = await instance.post("/api/auth/login", payload);
      //localStorage.setItem("token", res.data.accessToken);
      console.log("🚀 ~ file: userSlice.js:75 ~ res", res.data.accessToken);
      setCookie("token", res.data.accessToken, {
        path: "/",
        expire: "after60m",
      });

      window.alert("로그인 성공!");
      return thunkAPI.fulfillWithValue(res.data.accessToken);
    } catch (error) {
      window.alert("가입하신 이메일, 비밀번호와 다릅니다!!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//slice 데이터 저장
const userSlice = createSlice({
  name: "user",
  initialState,
  reducer: {},

  extraReducers: {
    [__signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [__signUp.fulfilled]: (state) => {
      state.isLoading = false;
      state.isSignup = true;
    },
    [__signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  //__postDupEmail
  [__postDupEmail.pending]: (state) => {
    state.isLoading = true;
  },
  [__postDupEmail.fulfilled]: (state, action) => {
    state.isLoading = false;
    state.dupCheck = action.payload.result;
  },
  [__postDupEmail.rejected]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  //__postDupCheck
  [__postDupNickname.pending]: (state) => {
    state.isLoading = true;
  },
  [__postDupNickname.fulfilled]: (state, action) => {
    state.isLoading = false;
    state.nickCheck = action.payload.result;
  },
  [__postDupNickname.rejected]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  //__postLogin
  [__postLogin.pending]: (state) => {
    state.isLoading = true;
  },
  [__postLogin.fulfilled]: (state, action) => {
    //state.nickname = action.payload;
    state.isLoading = false;
    state.isLogin = true;
  },
  [__postLogin.rejected]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
// export const {} = userSlice.action;
export default userSlice.reducer;
