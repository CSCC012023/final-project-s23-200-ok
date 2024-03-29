import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

//@route  POST api/posts
//@desc   Create a new post
//@access Private
const createPost = asyncHandler(async (req, res) => {
  // User id and userName set in authentication middleware
  const { user_id, userName, text, image } = req.body;
  let file = req.file;

  // Create post
  let post;
  if (req.file) {
    post = await Post.create({
      user_id,
      userName,
      text,
      image,
      file:file.id
    });
  }
  else {
    post = await Post.create({
      user_id,
      userName,
      text,
      image,
      file
    });
  }

  if (post) {
    res.status(201).json(post);
  } 
  else {
    res.status(400);
    throw new Error("Invalid post data");
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

  const posts = await Post.find({
    $and: [
      { user_id: { $nin: req.user.blockedUsers } }, // Exclude posts by blocked users
      { user_id: { $nin: req.user.blockedBy } }, // Exclude post if user is blocked by post creator
    ],
  });
  res.status(200).json(posts);
});

//@route   GET api/posts/byfriends
//@desc    get the posts of the friends of the user
//@access  Private
const getPostsByFriends = asyncHandler(async (req, res) => {
  var friend_posts = [];
    for (var i = 0; i <req.user.friends.length; i++){
      const friend_post = await Post.find().where("user_id").equals(req.user.friends[i].user_id);
      for (var j = 0; j < friend_post.length; j++){
        friend_posts.push(friend_post[j]);
      }
    }
    res.status(200).json(friend_posts);
});

//@route   GET api/posts/:id
//@desc    [DESCRIPTION OF WHAT ROUTE DOES]
//@access  [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const getPost = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Invalid user");
  }

  try{
    const post = await Post.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error while retrieving post");
  }
});

//@route PUT api/posts/:id
//@desc  [DESCRIPTION OF WHAT ROUTE DOES]
//@access [WHETHER PUBLIC OR PRIVATE i.e. LOGGED IN USER CAN ACCESS IT OR NOT]
const updatePost = asyncHandler(async (req, res) => {});

//@route DELETE api/posts/:id
//@desc  delete post
//@access private 
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.deleteOne();
    res.status(200).json({ "_id": req.params.id });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

//@route   PATCH api/posts/:id/react
//@desc    Add a like to the post
//@access  Private
const reactToPost = asyncHandler(async (req, res) => {
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
  }
  else {
    if (reaction === post.likes[reactionIndex].reaction) {
      // If the user clicked the same reaction again, remove reaction
      post.likes.splice(reactionIndex, 1);
    }
    else {
      // If the user clicked a different reaction, change reaction
      post.likes[reactionIndex].reaction = reaction;
    }
  }
  await post.save();

  return res.status(200).json(post);
});

export {
    createPost,
    getPosts,
    getPostsByFriends,
    getPost,
    updatePost,
    deletePost,
    reactToPost
};
