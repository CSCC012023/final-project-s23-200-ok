import asyncHandler from "express-async-handler";
import LFGPost from "../models/LFGPost.js";

//@route  POST api/lfgpost
//@desc   Create a new LFG post
//@access Private
const createLFGPost = asyncHandler(async (req, res) => {
  try {
    const {
      user_id,
      userName,
      game,
      notes,
      server,
      status,
      numberOfPlayers,
      rank,
    } = req.body;
    const date = new Date();

    const post = new LFGPost({
      user_id,
      userName,
      game,
      date,
      notes,
      server,
      status,
      numberOfPlayers,
      rank,
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
    res.status(500).json({ message: "Server Error While Creating LFG Post" });
  }
});

//@route   GET api/lfgpost
//@desc    Get all LFG posts
//@access  Public
const getLFGPosts = asyncHandler(async (req, res) => {
  const posts = await LFGPost.find({});
  res.json(posts);
});

//@route   GET api/lfgpost/filter
//@desc    Get all filtered LFG posts
//@access  Public
const getLFGPostsFiltered = asyncHandler(async (req, res) => {
  try{
    const posts = await LFGPost.find().where("game").equals(req.query.game).where("server").equals(req.query.server).where("numberOfPlayers").equals(req.query.numberOfPlayers).where("status").equals(req.query.status);
    res.status(200).json(posts);
  } catch (err){
    res.status(404).json({
      status: "fail",
      message: err.message
    })
  }
  
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
  console.log(req.body);
  console.log(post);

  if (post) {
    post.game = req.body.game;
    post.notes = req.body.notes;
    post.server = req.body.server;
    post.status = req.body.status;
    post.numberOfPlayers = req.body.numberOfPlayers;
    post.rank = req.body.rank;

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
    res.json({ "_id": req.params.id });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export { createLFGPost, getLFGPosts, getLFGPost, getLFGPostsFiltered, updateLFGPost, deleteLFGPost };
