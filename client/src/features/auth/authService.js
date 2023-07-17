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

// Delete user
const deleteUser = async (userId, token) => {
  console.log("delete user");
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);

    const response = await axios.delete(API_URL + userId, config);

    localStorage.removeItem("user");

    return response.data;
  } catch (error) {
    // Handle error, e.g., display a message or log the error
    console.error(error);
    throw error;
  }
};

const authService = {
  register,
  login,
  logout,
  deleteUser,
};

export default authService;
