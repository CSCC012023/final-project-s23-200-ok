import axios from "axios";

const API_URL = "/api/friendrequests/";

// Create friend request
const createFriendRequest = async (recipientUserId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + recipientUserId, {}, config);

  return response.data;
};

// Get incoming friend requests
const getIncomingFriendRequests = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "incoming", config);

  return response.data;
};

// Get outgoing friend requests
const getOutgoingFriendRequests = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "outgoing", config);

  return response.data;
};

const friendRequestsService = {
  createFriendRequest,
  getIncomingFriendRequests,
  getOutgoingFriendRequests
};

export default friendRequestsService;