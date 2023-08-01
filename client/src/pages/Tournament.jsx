import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Bracket from "../components/Bracket";
import {
  reset, 
  getAllTournaments,
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

  const [selectedTournament, setSelectedTournament] = useState();

  const handleSelectTournament = (e) => {
    setSelectedTournament(e.target.value);
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
    }

    //If no user is logged in redirect to the login page
    if (!user) {
      navigate("/login");
    }
  }, [selectedTournament]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <>
      <select
        name="tournament"
        value={selectedTournament}
        onChange={handleSelectTournament}
        required>
        <option value="">Select a game</option>
        {tournaments && tournaments.map((tournament) => (
          <option value={tournament._id}>{tournament.name} - {tournament.admin_user_name}</option>
        ))}
      </select>

      {tournaments &&
        selectedTournament &&
        tournaments.map((tournament) => {
          if (tournament._id.toString() === selectedTournament) {
            return (
              <Bracket
                key={selectedTournament}
                tournament={tournament}
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