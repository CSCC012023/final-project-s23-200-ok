import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

//@route  POST api/posts
//@desc   [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const createPost = asyncHandler(async (req, res) => {
    
});

//@route   GET api/posts
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getPosts = asyncHandler(async (req, res) => {

});

//@route   GET api/posts/:id
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getPost = asyncHandler(async (req, res) => {

});

//@route PUT api/posts/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updatePost = asyncHandler(async (req, res) => {
    
});

//@route DELETE api/posts/:id
//@desc  delete post
//@access private 
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
      await post.deleteOne({ _id: req.params.id });
      res.json({ message: "Post removed" });
    } else {
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