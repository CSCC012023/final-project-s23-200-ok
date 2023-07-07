import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// create post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await postService.createPost(postData, token);
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

//get post
export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await postService.getPosts(token);
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

//update post
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postId, postData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await postService.updatePost(postId, postData, token);
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

//delete post
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await postService.deletePost(postId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

//update reaction
export const reactToPost = createAsyncThunk(
  "post/reactToPost",
  async ({ postId, reaction }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      const response = await postService.reactToPost(postId, reaction, token);
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

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //create posts
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //get posts
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload.reverse();
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //update posts
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        });
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //delete posts
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //update reaction
      .addCase(reactToPost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(reactToPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        });
      })
      .addCase(reactToPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
