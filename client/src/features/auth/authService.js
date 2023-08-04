import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Log user out
const logout = async () => {
  localStorage.removeItem("user");
};

// Get friends
const getFriends = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "friends", config);

  return response.data;
};

// Get friends with userId
const getFriendsWithId = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "friends/" + userId, config);

  return response.data;
};

// Unfriend
const unfriend = async (friendUserId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  const response = await axios.patch(API_URL + friendUserId, {}, config);

  return response.data;
};

// Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + userId, config);

  localStorage.removeItem("user");

  return response.data;
};


// forgot password
const forgotPassword = async (userData) => {
  
  const response = await axios.post(API_URL + "forgotpassword", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  
}
const updateChatAlert = async (userId, chatAlert, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  localStorage.setItem(
    "user",
    JSON.stringify({
      ...JSON.parse(localStorage.getItem("user")),
      chatAlert: chatAlert,
    })
  );

  const response = await axios.put(
    API_URL + userId,
    { chatAlert: chatAlert },
    config
  );

  return response.data;
};


const authService = {
  register,
  login,
  logout,
  getFriends,
  getFriendsWithId,
  unfriend,
  deleteUser,
  forgotPassword, 
  updateChatAlert,
};

export default authService;
