import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import lfgReducer from "../features/lfg/lfgSlice";
import postsReducer from "../features/posts/postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    lfg: lfgReducer,
    posts: postsReducer,
  },
});
