import axios from "axios";

const API_URL = "/api/lfg/";

// Create post
const createPost = async (postData) => {
  const response = await axios.post(API_URL, postData);
  return response.data;
};

// Get posts
const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get post by id
const getPost = async (postId) => {
  const response = await axios.get(API_URL + postId);
  return response.data;
};

// Get filtered post
const getPostFiltered = async (filter) => {
  const response = await axios.get(API_URL + "filter", {params: filter});
  // console.log(response.data);
  return response.data;
};

// Update post
const updatePost = async (postId, postData) => {
  const response = await axios.put(API_URL + postId, postData);
  return response.data;
};

// Delete post
const deletePost = async (postId) => {
  const response = await axios.delete(API_URL + postId);
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
