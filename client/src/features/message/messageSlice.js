import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
  messages: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Async Thunk actions
export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (messageData, thunkAPI) => {
    try {
      console.log("messageData", messageData);

      const token = thunkAPI.getState().auth.user?.token;
      return await messageService.createMessage(messageData, token);
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

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (chat_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await messageService.getMessages(chat_id, token);
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

export const addMessage = createAction("message/addMessage");

// Slice
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // createMessage
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getMessages
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // addMessage
      .addCase(addMessage, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
