import axios from "axios";
import { Form } from "react-router-dom";

const API_URL = "/api/posts/";

// Create post
const createPost = async (postData, token) => {

  var config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (postData instanceof FormData){
    config.headers["Content-Type"] = "multipart/form-data";
  }
  console.log(config.headers);

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

const reactToPost = async (postId, reaction, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    API_URL + postId + "/react", 
    {"reaction": reaction},
    config
  );
  return response.data;
}

const postService = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  reactToPost,
};

export default postService;
