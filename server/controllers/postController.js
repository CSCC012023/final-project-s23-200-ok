import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

//@route  POST api/posts
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const createPost = asyncHandler(async (req, res) => {
  try {
    const { user_id, userName, content, image } = req.body;
    console.log("\n\n\n\nreq.body\n\n");
    console.log(req.body);

    const post = new Post({
      user_id,
      userName,
      content,
      image,
      date: new Date(),
      likes: [],
    });

    const createdPost = await post.save();

    if (!createdPost) {
      res.status(400);
      throw new Error("Invalid post data");
    } else {
      res.status(201).json(createdPost);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error While Creating Post" });
  }
});

//@route   GET api/posts
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getPosts = asyncHandler(async (req, res) => {
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

export { createPost, getPosts, getPost, updatePost, deletePost };
