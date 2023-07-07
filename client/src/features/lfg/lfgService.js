import axios from "axios";

const API_URL = "/api/lfg/";

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
const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get post by id
const getPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + postId, config);
  return response.data;
};

// Get filtered post
const getPostFiltered = async (filter, token) => {
  const config = {
    params: filter,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.get(API_URL + "filter", config);
  return response.data;
};

// Update post
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

const lfgService = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getPostFiltered,
};

export default lfgService;
