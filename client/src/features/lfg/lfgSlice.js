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
      const response = await lfgService.createPost(postData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getLFGPosts = createAsyncThunk(
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

export const getLFGPost = createAsyncThunk(
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

export const getLFGPostFiltered = createAsyncThunk(
  "lfgpost/getPostFiltered",
  async (filter, thunkAPI) => {
    try {
      const response = await lfgService.getPostFiltered(filter);
      console.log("Filtered response with id and evevrything: ");
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateLFGPost = createAsyncThunk(
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

export const deleteLFGPost = createAsyncThunk(
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
        state.posts = state.posts.filter((post) => post._id !== action.payload);
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
