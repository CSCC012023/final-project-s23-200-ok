import asyncHandler from "express-async-handler";
import LFGPost from "../models/LFGPost.js";
import LFGComment from "../models/LFGComment.js"

//@route  POST api/lfgpost
//@desc   Create a new LFG post
//@access Private
const createLFGPost = asyncHandler(async (req, res) => {
  try {
    // User id and userName set in authentication middleware
    const {
      user_id,
      userName,
      game,
      notes,
      server,
      status,
      numberOfPlayers,
      rank
    } = req.body;

    // Create LFG post
    const lfgPost = await LFGPost.create({
      user_id,
      userName,
      game,
      notes,
      server,
      status,
      numberOfPlayers,
      rank
    });

    if (lfgPost) {
      res.status(201).json(lfgPost);
    }
    else {
      res.status(400);
      throw new Error("Invalid LFG post data");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while creating LFG post");
  }
});

//@route  POST api/lfgpost/:id/comments
//@desc   Create a new LFG comment 
//@access Private
const createLFGComment = asyncHandler(async (req, res) => {
  try {
    // User id and userName set in authentication middleware
    const {
      user_id,
      userName,
      post_id,
      parent_comment_id,
      text,
    } = req.body;
    const date = new Date();
    // Create LFG comment
    const lfgComment = await LFGComment.create({
      user_id,
      userName,
      post_id,
      parent_comment_id,
      date,
      text,
    });
    if (lfgComment) {
      res.status(201).json(lfgComment);
    }
    else {
      res.status(400);
      throw new Error("Invalid LFG Comment data");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while creating LFG Comment");
  }
});

//@route   GET api/lfgpost
//@desc    Get all LFG posts
//@access  Private
const getLFGPosts = asyncHandler(async (req, res) => {
  // Check for user (set in authentication middleware)
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid user");
  }

  const posts = await LFGPost.find({});
  res.json(posts);
});

//@route   GET api/lfgpost/filter
//@desc    Get all filtered LFG posts
//@access  Private
const getLFGPostsFiltered = asyncHandler(async (req, res) => {
  // Check for user (set in authentication middleware)
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid user");
  }

  try{
    const filteredLFGPosts = await LFGPost.find()
                                          .where("game").equals(req.query.game)
                                          .where("server").equals(req.query.server)
                                          .where("numberOfPlayers").equals(req.query.numberOfPlayers)
                                          .where("status").equals(req.query.status);
    res.status(200).json(filteredLFGPosts);
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while getting filtered LFG posts");
  }  
});

//@route   GET api/lfgpost/:id
//@desc    Get LFG post by ID
//@access  Private
const getLFGPost = asyncHandler(async (req, res) => {
  // Check for user (set in authentication middleware)
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid user");
  }

  const post = await LFGPost.findById(req.params.id);

  if (post) {
    res.status(200).json(post);
  } 
  else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@route   GET api/lfgpost/:id/comment
//@desc    Get LFG comments by post ID
//@access  Private
const getLFGComments = asyncHandler(async (req, res) => {
  // Check for user (set in authentication middleware)
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid user");
  }
  const comments = await LFGComment.find().where("post_id").equals(req.params.id);
  if (comments) {
    res.status(200).json(comments);
  } 
  else {
    res.status(404);
    throw new Error("Comments not found");
  }
});

//@route PUT api/lfgpost/:id
//@desc  Update LFG post
//@access Private
const updateLFGPost = asyncHandler(async (req, res) => {
  // Check for user (set in authentication middleware)
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid user");
  }

  let post = await LFGPost.findById(req.params.id);
  post.date = new Date();

  if (post) {
    post.game = req.body.game;
    post.notes = req.body.notes;
    post.server = req.body.server;
    post.status = req.body.status;
    post.numberOfPlayers = req.body.numberOfPlayers;
    post.rank = req.body.rank;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@route PUT api/lfgpost/:id/comment/:id
//@desc  Update LFG comment
//@access Private
const updateLFGComment = asyncHandler(async (req, res) => {
  // Check for user (set in authentication middleware)
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid user");
  }

  let comment = await LFGComment.findById(req.params.id);
  if (comment) {
    comment.text = req.body.text;
    comment.date = new Date();
    const updatedComment = await comment.save();
    res.status(200).json(updatedComment);
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

//@route DELETE api/lfgpost/:id
//@desc  Delete LFG post
//@access Private
const deleteLFGPost = asyncHandler(async (req, res) => {
  // Check for user (set in authentication middleware)
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid user");
  }

  const post = await LFGPost.findById(req.params.id);

  if (post) {
    await post.deleteOne();
    res.status(200).json({ "_id": req.params.id });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@route DELETE api/lfgpost/:id/comment/:id
//@desc  Delete LFG comment
//@access Private
const deleteLFGComment = asyncHandler(async (req, res) => {
  // Check for user (set in authentication middleware)
  if (!req.user) {
    res.status(400);
    throw new Error("Invalid user");
  }
  const comment = await LFGComment.findById(req.params.id);

  if (comment) {
    await comment.deleteOne({ _id: req.params.id });
    res.status(200).json({ "_id": req.params.id });
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

export {
  createLFGPost,
  createLFGComment,
  getLFGPosts,
  getLFGPost,
  getLFGComments,
  getLFGPostsFiltered,
  updateLFGPost,
  updateLFGComment,
  deleteLFGPost,
  deleteLFGComment
};
