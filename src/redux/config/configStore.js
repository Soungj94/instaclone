import { configureStore } from "@reduxjs/toolkit";
import commentPost from "../modules/commentSlice";
import mainSlice from "../modules/mainSlice";
import userSlice from "../modules/userSlice";
import profileSlice from "../modules/profileSlice";

export const store = configureStore({
  reducer: { commentPost, userSlice, mainSlice, profileSlice },
  devTools: false,
});
