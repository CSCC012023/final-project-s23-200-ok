import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

//@route  POST api/posts
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const createPost = asyncHandler(async (req, res) => {
  try {
    const { user_id, userName, text, image } = req.body;

    // Create post
    const post = await Post.create({
      user_id,
      userName,
      text,
      image
    });

    if (post) {
      res.status(201).json(post);
    } 
    else {
      res.status(400);
      throw new Error("Invalid post data");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while creating post");
  }
});

//@route   GET api/posts
//@desc    TODO: Get all posts created by logged in user or their friends, all posts for now
//@access  Private
const getPosts = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  const posts = await Post.find({});
  res.json(posts);
});

//@route   GET api/posts/:id
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getPost = asyncHandler(async (req, res) => {});

//@route PUT api/posts/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updatePost = asyncHandler(async (req, res) => {});

//@route DELETE api/posts/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const deletePost = asyncHandler(async (req, res) => {});

export { 
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
};