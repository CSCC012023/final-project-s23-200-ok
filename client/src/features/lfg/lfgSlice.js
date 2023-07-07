import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lfgService from "./lfgService";

const initialState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Async Thunk actions
export const createLFGPost = createAsyncThunk(
  "lfgpost/createPost",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await lfgService.createPost(postData, token);
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

export const getLFGPosts = createAsyncThunk(
  "lfgpost/getPosts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await lfgService.getPosts(token);
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

export const getLFGPost = createAsyncThunk(
  "lfgpost/getPost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await lfgService.getPost(postId, token);
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

export const getLFGPostFiltered = createAsyncThunk(
  "lfgpost/getPostFiltered",
  async (filter, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await lfgService.getPostFiltered(filter, token);
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

export const updateLFGPost = createAsyncThunk(
  "lfgpost/updatePost",
  async ({ postId, postData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await lfgService.updatePost(postId, postData, token);
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

export const deleteLFGPost = createAsyncThunk(
  "lfgpost/deletePost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await lfgService.deletePost(postId, token);
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
export const lfgSlice = createSlice({
  name: "lfg",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // createPost
      .addCase(createLFGPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLFGPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createLFGPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getPosts
      .addCase(getLFGPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLFGPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getLFGPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("action payload: " + action.payload);
        state.message = action.payload;
      })

      // getPost
      .addCase(getLFGPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLFGPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.posts = action.payload;
      })
      .addCase(getLFGPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getPostsFiltered
      .addCase(getLFGPostFiltered.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLFGPostFiltered.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getLFGPostFiltered.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // updatePost
      .addCase(updateLFGPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLFGPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updateLFGPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // deletePost
      .addCase(deleteLFGPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLFGPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("Delete payload: " + action.payload);
        state.posts = state.posts.filter((post) => post._id !== action.payload._id);
      })
      .addCase(deleteLFGPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = lfgSlice.actions;
export default lfgSlice.reducer;
