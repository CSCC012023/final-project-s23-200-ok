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

// // Respond to friend request
const respondToFriendRequest = async (friendRequestId, newStatus, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    API_URL + friendRequestId,
    {"newStatus": newStatus},
    config);

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

// Delete friend request
const deleteFriendRequest = async (friendRequestId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + friendRequestId,
    config);

  return response.data;
};

const friendRequestsService = {
  createFriendRequest,
  respondToFriendRequest,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
  deleteFriendRequest
};

export default friendRequestsService;