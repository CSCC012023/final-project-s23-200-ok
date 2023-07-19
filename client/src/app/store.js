import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import lfgReducer from "../features/lfg/lfgSlice";
import postsReducer from "../features/posts/postSlice";
import messageReducer from "../features/message/messageSlice";
import chatReducer from "../features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    lfg: lfgReducer,
    posts: postsReducer,
    message: messageReducer,
    chat: chatReducer,
  },
});
