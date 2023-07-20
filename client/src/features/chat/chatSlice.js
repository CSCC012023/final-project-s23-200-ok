import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
  chats: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Async Thunk actions
export const createChat = createAsyncThunk(
  "chat/createChat",
  async (chatData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await chatService.createChat(chatData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await chatService.getChats(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getChat = createAsyncThunk(
  "chat/getChat",
  async (chatId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await chatService.getChat(chatId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.chats = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // createChat
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getChats
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getChat
      .addCase(getChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats.push(action.payload);
      })
      .addCase(getChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
