import axios from "axios";

const API_URL = "/api/posts/";

// Create post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postData, config);

  return response.data;
};

// Get posts
const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// update post
const updatePost = async (postId, postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + postId, postData, config);
  return response.data;
};

// Delete post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + postId, config);
  return response.data;
};

const postService = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};

export default postService;
