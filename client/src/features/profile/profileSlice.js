import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

const initialState = {
  bio: "",
  profilePicture: "",
  name: "",
  socials: [],
  games: [
    { name: "Valorant", username: "", rank: "" },
    { name: "Overwatch", username: "", rank: "" },
  ],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get profile
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (profileId, thunkAPI) => {
    try {
      const response = await profileService.getProfile(profileId);
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

// Update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ profileId, profileData }, thunkAPI) => {
    try {
      return await profileService.updateProfile(profileId, profileData);
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
      return await profileService.linkValorant(profileId, valorantData);
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
      return await profileService.linkOverwatch(profileId, overwatchData);
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
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.bio = "";
      state.profilePicture = "";
      state.name = "";
      state.socials = [];
      state.games = [
        { name: "Valorant", username: "", rank: "" },
        { name: "Overwatch", username: "", rank: "" },
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bio = action.payload.bio;
        state.profilePicture = action.payload.profilePic;
        state.name = action.payload.name;
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
        state.isLoading = false;
        state.isSuccess = true;
        state.bio = action.payload.bio;
        state.profilePicture = action.payload.profilePic;
        state.name = action.payload.name;
        state.socials = action.payload.socials;
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
        state.games[0].username = action.payload.username;
        state.games[0].rank = action.payload.rank;
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
        state.games[1].username = action.payload.username;
        state.games[1].rank = action.payload.rank;
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
