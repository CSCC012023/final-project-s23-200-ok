import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {createComment,getComments,updateComment,deleteComment} from "./CommentService";

export const createLFGComment = createAsyncThunk(
    "lfgpost/createLFGComment",
    async (content, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user?.token;
        return await createComment(content, token);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);

export const getLFGComments = createAsyncThunk(
    "lfgpost/getLFGComments",
    async (postId, thunkAPI) => {
        try {
        const token = thunkAPI.getState().auth.user?.token;
        return await getComments(postId, token);
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

export const updateLFGComment = createAsyncThunk(
    "lfgpost/updateLFGComment",
    async (content, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user?.token;
        return await updateComment(content, token);
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

export const deleteLFGComment = createAsyncThunk(
    "lfgpost/deleteLFGComment",
    async (content, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user?.token;
        return await deleteComment(content, token);
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

const initialState = {
    comments: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

// Slice
export const CommentSlice = createSlice({
    name: "Comments",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
        state.comments = [];
      },
    },
    extraReducers: (builder) => {
      builder
        // createComment
        .addCase(createLFGComment.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createLFGComment.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // state.comments.push(action.payload);
          state.comments=(action.payload);
        })
        .addCase(createLFGComment.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
  
        // getComments
        .addCase(getLFGComments.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getLFGComments.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.comments = action.payload;
        })
        .addCase(getLFGComments.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          console.log("action payload: " + action.payload);
          state.message = action.payload;
        })
  
        // updateComment
        .addCase(updateLFGComment.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateLFGComment.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.comments = state.comments.map((comment) =>
            comment._id === action.payload._id ? action.payload : comment
          );
        })
        .addCase(updateLFGComment.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
  
        // deleteComment
        .addCase(deleteLFGComment.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteLFGComment.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          console.log("Delete payload: " + action.payload);
          state.comments = state.comments.filter((comment) => comment._id !== action.payload._id);
        })
        .addCase(deleteLFGComment.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  
  export const { reset } = CommentSlice.actions;
  export default CommentSlice.reducer;