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

// Create tournament
export const createTournament = createAsyncThunk(
  "tournaments/createTournament",
  async ({ tournamentName }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await tournamentsService.createTournament(token, tournamentName);
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

// Update tournament by id
export const updateTournamentById = createAsyncThunk(
  "tournaments/updateTournamentById",
  async ({ tournamentId, updatedTournament }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await tournamentsService.updateTournamentById(
        token,
        tournamentId,
        updatedTournament
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

// Add participant to team
export const addParticipantToTeam = createAsyncThunk(
  "tournaments/addParticipantToTeam",
  async ({ tournamentId, teamId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await tournamentsService.addParticipantToTeam(
        token,
        tournamentId,
        teamId
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

// Leave tournament
export const leaveTournament = createAsyncThunk(
  "tournaments/leaveTournament",
  async ({ tournamentId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await tournamentsService.leaveTournament(token, tournamentId);
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

// Leave tournament

export const tournamentsSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get all tournaments
      .addCase(getAllTournaments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTournaments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.tournaments = action.payload;
      })
      .addCase(getAllTournaments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Create tournament
      .addCase(createTournament.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTournament.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tournaments.push(action.payload);
      })
      .addCase(createTournament.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update tournament by id
      .addCase(updateTournamentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTournamentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tournaments = state.tournaments.map((tournament) =>
          tournament._id === action.payload._id ? action.payload : tournament
        );
      })
      .addCase(updateTournamentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add participant to team
      .addCase(addParticipantToTeam.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addParticipantToTeam.fulfilled, (state, access) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tournaments = state.tournaments.map((tournament) =>
          tournament._id === access.payload._id ? access.payload : tournament
        );
      })
      .addCase(addParticipantToTeam.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Leave tournament
      .addCase(leaveTournament.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(leaveTournament.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tournaments = state.tournaments.map((tournament) =>
          tournament._id === action.payload._id ? action.payload : tournament
        );
      })
      .addCase(leaveTournament.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tournamentsSlice.actions;
export default tournamentsSlice.reducer;
