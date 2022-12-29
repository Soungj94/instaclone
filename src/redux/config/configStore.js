import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../modules/mainSlice";
import userSlice from "../modules/userSlice";
import profileSlice from "../modules/profileSlice";

export const store = configureStore({
  reducer: { userSlice, mainSlice, profileSlice },
  devTools: false,
});
