import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lfgService from "./lfgService";

const initialState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Async Thunk actions
export const createPost = createAsyncThunk(
  "lfgpost/createPost",
  async (postData, thunkAPI) => {
    try {
      const response = await lfgService.createPost(postData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPosts = createAsyncThunk(
  "lfgpost/getPosts",
  async (thunkAPI) => {
    try {
      const response = await lfgService.getPosts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPost = createAsyncThunk(
  "lfgpost/getPost",
  async (postId, thunkAPI) => {
    try {
      const response = await lfgService.getPost(postId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "lfgpost/updatePost",
  async ({ postId, postData }, thunkAPI) => {
    try {
      const response = await lfgService.updatePost(postId, postData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "lfgpost/deletePost",
  async (postId, thunkAPI) => {
    try {
      await lfgService.deletePost(postId);
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
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
      state.currentPost = null;
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // createPost
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getPosts
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getPost
      .addCase(getPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentPost = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // updatePost
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // deletePost
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = lfgSlice.actions;
export default lfgSlice.reducer;
