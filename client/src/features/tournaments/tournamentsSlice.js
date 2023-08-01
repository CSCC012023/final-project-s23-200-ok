import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tournamentsService from "./tournamentsService";

const initialState = {
  tournaments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get all tournaments
export const getAllTournaments = createAsyncThunk(
  "tournaments/getAllTournaments",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await tournamentsService.getAllTournaments(token);
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

export const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTournaments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTournaments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tournaments = action.payload;
      })
      .addCase(getAllTournaments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const { reset } = tournamentsSlice.actions;
export default tournamentsSlice.reducer;