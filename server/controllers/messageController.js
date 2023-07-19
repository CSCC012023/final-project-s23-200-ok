import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";

// @route  GET api/message/:id
// @desc   Get messages by chat id
// @access Private

const getMessages = asyncHandler(async (req, res) => {
  try {
    const chat_id = req.params.id;
    const messages = await Message.find({ chat_id: chat_id });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server error while getting messages");
  }
});

// @route  POST api/message/
// @desc   Create a message in a chat
// @access Private
const createMessage = asyncHandler(async (req, res) => {
  try {
    const { message, sender_user_id, sender_user_name, chatId } =
      req.body.message;

    const newMessage = new Message({
      chat_id: chatId,
      message: message,
      sender_user_id: sender_user_id,
      sender_user_name: sender_user_name,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Server error while creating message");
  }
});

export { getMessages, createMessage };
