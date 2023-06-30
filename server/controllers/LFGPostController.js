import asyncHandler from "express-async-handler";
import LFGPost from "../models/LFGPost.js";

//@route  POST api/lfgpost
//@desc   Create a new LFG post
//@access Private
const createLFGPost = asyncHandler(async (req, res) => {
  const { user_id, game, notes, server, status, numberOfPlayers, rank } =
    req.body;
  console.log(req.body);
  const date = new Date();
  console.log(user_id);

  const post = new LFGPost({
    user: user_id,
    game,
    date,
    notes,
    server,
    status,
    numberOfPlayers,
    rank,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

//@route   GET api/lfgpost
//@desc    Get all LFG posts
//@access  Public
const getLFGPosts = asyncHandler(async (req, res) => {
  const posts = await LFGPost.find({});
  res.json(posts);
});

//@route   GET api/lfgpost/:id
//@desc    Get LFG post by ID
//@access  Public
const getLFGPost = asyncHandler(async (req, res) => {
  const post = await LFGPost.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@route PUT api/lfgpost/:id
//@desc  Update LFG post
//@access Private
const updateLFGPost = asyncHandler(async (req, res) => {
  let post = await LFGPost.findById(req.params.id);
  post.date = new Date();

  if (post) {
    post.game = req.body.game || post.game;
    post.notes = req.body.notes || post.notes;
    post.server = req.body.server || post.server;
    post.status = req.body.status || post.status;
    post.numberOfPlayers = req.body.numberOfPlayers || post.numberOfPlayers;
    post.rank = req.body.rank || post.rank;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@route DELETE api/lfgpost/:id
//@desc  Delete LFG post
//@access Private
const deleteLFGPost = asyncHandler(async (req, res) => {
  const post = await LFGPost.findById(req.params.id);

  if (post) {
    await post.deleteOne({ _id: req.params.id });
    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export { createLFGPost, getLFGPosts, getLFGPost, updateLFGPost, deleteLFGPost };
