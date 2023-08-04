import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  updateProfile,
  reset,
} from "../features/profile/profileSlice";
import {
  getFriends,
  unfriend,
  logout,
  deleteUserAccount
} from "../features/auth/authSlice";
import "../styles/GameStat.css";
import Spinner from "../components/Spinner";
import ValStat from "../components/ValStat"

const GameStat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get and destructure the auth slice
  const { user } = useSelector((state) => state.auth);
  // Get and destructure the profile slice
  const {
    userName,
    bio,
    profilePicture,
    location,
    games,
    socials,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.profile);


  const [cgame, setCGame] = useState("");


  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    //If no user is logged in redirect to the login page
    if (!user) {
      navigate("/login");
    }

    dispatch(getProfile());
    dispatch(getFriends());


    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);


  // Render an error message if there was an error
  if (isError) {
    return <div>Error: {message}</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }
  console.log(games);

  function filterGames(games){
    var newGames = []
    for (let i=0;i<games.length;i++){
        if (games[i].ign != ""){
            newGames.push(games[i]);
        }
    }
    console.log(newGames);
    if (newGames.length == 0){
        return null;
    }
    return newGames;
  }

  return (
    <div className="profile-container">
      <div className="games-section">
        <h2>Game stat</h2>

        {/* <button onClick={()=>{console.log(filterGames(games))}}>
            test
        </button> */}
        {/* shows which game state to show */}
        <div className="game-select">
            { filterGames(games) && filterGames(games).map((game, index) => (
                <button key={index} className="game-select-block"
                    onClick={() => {
                        setCGame(game.name);
                        console.log(cgame);
                    }}>
                        {game.name}    
                </button>
            ))}
        </div>
        <hr className="game-select-linebreak"/>

        <div className="game-stat-container">

            { cgame === "Valorant" && <ValStat/>}

            { cgame === "Overwatch" && <div>
                bye
                </div>}
        </div>

   
  
      </div>


    </div>
  );
};

export default GameStat;
