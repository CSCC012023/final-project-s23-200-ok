import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";

// @route  GET api/chat/
// @desc   Get all chats for a user
// @access Private
const getChats = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user._id;
    const chats = await Chat.find({
      user_ids_names: { $elemMatch: { user_id: user_id } },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server error while getting chats");
  }
});

// @route  GET api/chat/:id
// @desc   Get chat by id
// @access Private
const getChatById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server error while getting chat by id");
  }
});

// @route  POST api/chat
// @desc   Create a chat
// @access Private
const createChat = asyncHandler(async (req, res) => {
  try {
    const { user_id, user_name, other_user_id, other_user_name } = req.body;

    const newChat = new Chat({
      user_ids_names: [
        {
          user_id: user_id,
          user_name: user_name,
        },
        {
          user_id: other_user_id,
          user_name: other_user_name,
        },
      ],
    });

    const chat = await newChat.save();

    res.status(201).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server error while creating chat");
  }
});

export { getChats, getChatById, createChat };
