import axios from "axios";

const API_URL = "/api/tournament/";

const getAllTournaments = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const tournamentsService = {
  getAllTournaments,
};

export default tournamentsService;