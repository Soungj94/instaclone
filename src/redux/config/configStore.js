import { configureStore } from "@reduxjs/toolkit";
import commentPost from "../modules/commentSlice";
import userSlice from "../modules/userSlice";
export const store = configureStore({
  reducer: { commentPost, userSlice },
});
