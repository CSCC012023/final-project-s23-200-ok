import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendRequestsService from "./friendRequestsService";

const initialState = {
  incomingFriendRequests: [],
  outgoingFriendRequests: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Create friend request
export const createFriendRequest = createAsyncThunk(
  "friendRequests/createFriendRequest",
  async (recipientUserId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await friendRequestsService.createFriendRequest(recipientUserId, token);
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

// Get incoming friend requests
export const getIncomingFriendRequests = createAsyncThunk(
  "friendRequests/getIncomingFriendRequests",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await friendRequestsService.getIncomingFriendRequests(token);
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

// Get incoming friend requests
export const getOutgoingFriendRequests = createAsyncThunk(
  "friendRequests/getOutgoingFriendRequests",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await friendRequestsService.getOutgoingFriendRequests(token);
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

export const friendRequestsSlice = createSlice({
  name: "friendRequests",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFriendRequest.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createFriendRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.outgoingFriendRequests.unshift(action.payload);
      })
      .addCase(createFriendRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getIncomingFriendRequests.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getIncomingFriendRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomingFriendRequests = action.payload.reverse();
      })
      .addCase(getIncomingFriendRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getOutgoingFriendRequests.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getOutgoingFriendRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.outgoingFriendRequests = action.payload.reverse();
      })
      .addCase(getOutgoingFriendRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = friendRequestsSlice.actions;
export default friendRequestsSlice.reducer;