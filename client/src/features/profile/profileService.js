import axios from "axios";

const API_URL = "/api/profile/";

// Create profile
const createProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, {}, config);

  return response.data;
};

// Get profile
const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Link Valorant
const linkValorant = async (profileId, valorantData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + profileId + "/games/valorant",
    valorantData,
    config
  );
  return response.data;
};

// Link Overwatch
const linkOverwatch = async (profileId, overwatchData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + profileId + "/games/overwatch",
    overwatchData,
    config
  );
  return response.data;
};

// Update profile
const updateProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, profileData, config);
  return response.data;
};

const profileService = {
  createProfile,
  getProfile,
  linkValorant,
  linkOverwatch,
  updateProfile,
};

export default profileService;
