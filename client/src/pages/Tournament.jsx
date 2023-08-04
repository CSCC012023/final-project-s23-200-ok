import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Bracket from "../components/Bracket";
import {
  reset,
  createTournament,
  getAllTournaments,
  addParticipantToTeam,
  leaveTournament,
} from "../features/tournaments/tournamentsSlice";

const Tournament = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    tournaments,
    isLoading,
    isError,
    message
  } = useSelector((state) => state.tournaments);

  const [createTournamentName, setCreateTournamentName] = useState("");
  const [selectedTournament, setSelectedTournament] = useState("Create tourney");

  const onChange = (e) => {
    setCreateTournamentName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createTournament({ tournamentName: createTournamentName }));

    setCreateTournamentName("");
  };

  const handleSelectTournament = (e) => {
    setSelectedTournament(e.target.value);
  };

  const handleAddParticipantToTeam = (tournamentId, teamId) => {
    dispatch(addParticipantToTeam({
      tournamentId,
      teamId
    }));
  };

  const handleLeaveTournament = (tournamentId) => {
    dispatch(leaveTournament({ tournamentId }));
  };

  useEffect(() => {
    dispatch(getAllTournaments());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    //If no user is logged in redirect to the login page
    if (!user) {
      navigate("/login");
    }
  }, [isError, message, selectedTournament]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <select
        name="tournament"
        value={selectedTournament}
        onChange={handleSelectTournament}
        required>
        <option value="Create tourney">Create a tournament</option>
        {tournaments && tournaments.map((tournament) => (
          <option value={tournament._id}>{tournament.name} - {tournament.admin_user_name}</option>
        ))}
      </select>

      {selectedTournament === "Create tourney" &&
        (
          <section className="form">
            <form onSubmit={onSubmit} className="form-group">
              <input 
              type="text"
              value={createTournamentName}
              placeholder="Tournament Name"
              onChange={onChange} />
              <button className="btn btn-block" type="submit">Create</button>
            </form>
          </section>
        )
      }

      {tournaments &&
        selectedTournament &&
        tournaments.map((tournament) => {
          if (tournament._id.toString() === selectedTournament) {
            return (
              <Bracket
                key={selectedTournament}
                tournament={tournament}
                handleAddParticipantToTeam={handleAddParticipantToTeam}
                handleLeaveTournament={handleLeaveTournament}
              />
            );
          }
          return null;
        })
      }
    </>
  );

};

export default Tournament;