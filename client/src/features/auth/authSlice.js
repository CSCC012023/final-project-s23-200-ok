import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import profileService from "../profile/profileService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  friends: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const userRegistrationResponse = await authService.register(user);
      //await profileService.createProfile(userRegistrationResponse?.token);
      return userRegistrationResponse;
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

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Log user out
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Get friends
export const getFriends = createAsyncThunk(
  "auth/getFriends",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await authService.getFriends(token);
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

// Get friends with id
export const getFriendsWithId = createAsyncThunk(
  "auth/getFriendsWithId",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await authService.getFriendsWithId(userId, token);
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

// Unfriend
export const unfriend = createAsyncThunk(
  "auth/unFriend",
  async (friendUserId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await authService.unfriend(friendUserId, token);
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

// Delete user account
export const deleteUserAccount = createAsyncThunk(
  "auth/delete",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await authService.deleteUser(userId, token);
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
// reset password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (userData, thunkAPI) => {
    try {
      // call using authService.forgotPassword method
      const response = await authService.forgotPassword(userData);

      // assume reset password API returns a success message or some data
      return response;
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

// Block user
export const blockUser = createAsyncThunk(
  "auth/block",
  async (blockedUserId, thunkAPI) => {
    console.log(blockedUserId);
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await authService.blockUser(blockedUserId, token);
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

// Update chat alert
export const updateChatAlert = createAsyncThunk(
  "auth/updateChatAlert",
  async ({ chatAlert, userId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await authService.updateChatAlert(userId, chatAlert, token);
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // get friends
      .addCase(getFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.friends = action.payload;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // get friends with id
      .addCase(getFriendsWithId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriendsWithId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.friends = action.payload;
      })
      .addCase(getFriendsWithId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // unfriend
      .addCase(unfriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unfriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.friends = action.payload;
      })
      .addCase(unfriend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // delete user account
      .addCase(deleteUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // block user
      .addCase(blockUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true; 
        state.user.currUser = action.payload.currUser;
        state.user.tgtUser = action.payload.tgtUser;
        console.log(action.payload);
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.log(action.payload);
      })
      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Password reset successful";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // update chat alert
      .addCase(updateChatAlert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateChatAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.user.chatAlert = action.payload.chatAlert;
      })
      .addCase(updateChatAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
