import axios from "axios";

const API_URL = "/api/message/";

// Create message
const createMessage = async (messageData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, messageData, config);
  return response.data;
};

// Get messages
const getMessages = async (chat_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}${chat_id}/`, config);
  return response.data;
};

const messageService = {
  createMessage,
  getMessages,
};

export default messageService;
