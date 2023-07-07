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

//@route   PATCH api/posts/:id/react
//@desc    Add a like to the post
//@access  Private
const reactToPost = asyncHandler(async (req, res) => {
  try {
    const { reaction } = req.body; // Taking reaction type from the request body
    const user = req.user.id;
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    // Gettting the index of the reaction to update
    const reactionIndex = post.likes.findIndex(like => like.user.toString() === user);

    if (reactionIndex === -1) {
      // If the user has not reacted to the post before, add reaction
      post.likes.unshift({ user, reaction });
    } else {
      if (reaction === post.likes[reactionIndex].reaction) {
        // If the user clicked the same reaction again, remove reaction
        post.likes.splice(reactionIndex, 1);
      } else {
        // If the user clicked a different reaction, change reaction
        post.likes[reactionIndex].reaction = reaction;
      }
    }
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while liking post");
  }
});

export {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    reactToPost
};
