import axios from "axios";

const API_URL = "/api/chat/";

// Create chat
const createChat = async (chatData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, chatData, config);
  return response.data;
};

// Get chats
const getChats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get chat by id
const getChat = async (chatId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + chatId, config);
  return response.data;
};

const chatService = {
  createChat,
  getChat,
  getChats,
};

export default chatService;
