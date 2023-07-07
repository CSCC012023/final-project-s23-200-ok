import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

//@route  POST api/posts
//@desc   Create a new post
//@access Private
const createPost = asyncHandler(async (req, res) => {
  try {
    // User id and userName set in authentication middleware
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
  // Check for user (set in authentication middleware)
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid user");
  }

  const posts = await Post.find({});
  res.status(200).json(posts);
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
//@desc  delete post
//@access private 
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    // the user is authorized to delete it. 
    if (post) {
      await post.deleteOne({ _id: req.params.id });
      res.json({ "_id": req.params.id });
    } else { // post not available
      res.status(404);
      throw new Error("Post not found");

    }
    
});

export { 
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
};