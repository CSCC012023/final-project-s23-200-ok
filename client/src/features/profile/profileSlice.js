import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
  profileId: null,
  userName: "",
  bio: "",
  profilePicture: "",
  location: "",
  games: [
    { name: "Valorant", username: "", rank: "" },
    { name: "Overwatch", username: "", rank: "" },
  ],
  socials: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get profile
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await profileService.getProfile(token);
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

// Update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ profileData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await profileService.updateProfile(profileData, token);
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

// Link Valorant
export const linkValorant = createAsyncThunk(
  "profile/linkValorant",
  async ({ profileId, valorantData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await profileService.linkValorant(profileId, valorantData, token);
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

// Link Overwatch
export const linkOverwatch = createAsyncThunk(
  "profile/linkOverwatch",
  async ({ profileId, overwatchData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await profileService.linkOverwatch(
        profileId,
        overwatchData,
        token
      );
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profileId = action.payload._id;
        state.userName = action.payload.userName;
        state.bio = action.payload.bio;
        state.profilePicture = action.payload.profilePicture;
        state.location = action.payload.location;
        state.socials = action.payload.socials;
        state.games = action.payload.games;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log("1231231323", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.bio = action.payload.bio;
        state.profilePicture = action.payload.profilePicture;
        state.location = action.payload.location;
        state.socials = action.payload.socials;
        state.games = action.payload.games;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(linkValorant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(linkValorant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(linkValorant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(linkOverwatch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(linkOverwatch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(linkOverwatch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
