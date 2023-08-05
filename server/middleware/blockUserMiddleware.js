import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Post from "../models/Post.js";
import LFGPost from "../models/LFGPost.js";
import LFGComment from "../models/LFGComment.js";
import Profile from "../models/Profile.js";
import Chat from "../models/Chat.js";

// Enforces blocklist rules for general interactions such as posts, comments, and profiles
// Use for requests that include a specific document ID in the URL, such as GET /posts/:id
// Note that the document must have a user_id index for the author/creator
const checkBlockedUser = asyncHandler((interactionType) => async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Invalid user");
  }

  const modelMap = {
    "post": Post,
    "lfgpost": LFGPost,
    "lfgcomment": LFGComment,
    "profile": User,
    "user": User,
  };

  if (!modelMap[interactionType]) {
    res.status(400).json({ error: "Invalid interaction type" });
  }

  const document = await modelMap[interactionType].findById(req.params.id);
  if (!document) {
    res.status(404);
    throw new Error("Document not found");
  }

  const currentUser = await User.findById(req.user._id);
  const otherUser = await User.findById(document.user_id);

  if (!otherUser) {
    res.status(404);
    throw new Error("User not found");
  } else if (currentUser.blockedBy.includes(document.user_id)) {
    res.status(400);
    throw new Error("Access denied, you are blocked by this user");
  } else if (currentUser.blockedUsers.includes(document.user_id)) {
    res.status(400);
    throw new Error("Access denied, you have blocked this user");
  } else {
    next();
  }
});

// Enforces blocklist rules for chat interactions
const checkBlockedUserChat = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Invalid user");
  }

  const chat = await Chat.findById(req.params);
  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }
        
  const user1 = await User.findById(chat.user_ids_names[0].user_id);
  if (!user1) {
    res.status(404);
    throw new Error("A user in the chat could not be found");
  }
        
  const blocklist = user1.blockedUsers.concat(user1.blockedBy);

  if (blocklist.includes(chat.user_ids_names[1].user_id)) {
    res.status(400).json({ error: "One of the users in this chat has blocked the other" });
  }

  next();
});

export {
  checkBlockedUser,
  checkBlockedUserChat,
};
