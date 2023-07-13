import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";

// @route  GET api/chat
// @desc   Get all chats for a user
// @access Private
const getChats = asyncHandler(async (req, res) => {
  try {
    const { user_id } = req.body;

    const chats = await Chat.find({ user_ids_names: [user_id] });
    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server error while getting chats");
  }
});
