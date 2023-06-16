import axios from "axios";

const API_URL = "/api/profile/";

// Get profile
const getProfile = async (profileId) => {
  const response = await axios.get(API_URL + profileId);
  return response.data;
};

const linkValorant = async (profileId, valorantData) => {
  const response = await axios.post(
    API_URL + profileId + "/games/valorant",
    valorantData
  );
  return response.data;
};

const linkOverwatch = async (profileId, overwatchData) => {
  const response = await axios.post(
    API_URL + profileId + "/games/overwatch",
    overwatchData
  );
  return response.data;
};

const updateProfile = async (profileId, profileData) => {
  const response = await axios.put(API_URL + profileId, profileData);
  return response.data;
};

const profileService = {
  getProfile,
  linkValorant,
  linkOverwatch,
  updateProfile,
};

export default profileService;
