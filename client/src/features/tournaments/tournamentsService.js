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

const createTournament = async (token, tournamentName) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL,
    { tournamentName: tournamentName },
    config
  );

  return response.data;
};

const updateTournamentById = async (token, tournamentId, updatedTournament) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    `${API_URL}${tournamentId}`,
    updatedTournament,
    config
  );

  return response.data;
};

const addParticipantToTeam = async (token, tournamentId, teamId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}${tournamentId}`,
    { teamId: teamId },
    config
  );

  return response.data;
};

const leaveTournament = async (token, tournamentId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}${tournamentId}`, config);

  return response.data;
};

const tournamentsService = {
  getAllTournaments,
  createTournament,
  updateTournamentById,
  addParticipantToTeam,
  leaveTournament,
};

export default tournamentsService;
