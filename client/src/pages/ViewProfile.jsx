import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  getProfileWithId,
} from "../features/profile/profileSlice";
import {
  getFriendsWithId,
} from "../features/auth/authSlice";
import { valorantLogos } from "../logos/valorantLogo";
import { overwatchLogos } from "../logos/overwatchLogo";
import Modal from "react-modal";
import ZombieFriend from "../components/ZombieFriend";
import Spinner from "../components/Spinner";
import InstagramIcon from "../assets/InstagramIcon.png";
import TwitterIcon from "../assets/TwitterIcon.png";
import TikTokIcon from "../assets/TikTokIcon.png";
import YoutubeIcon from "../assets/YoutubeIcon.png";
import TwitchIcon from "../assets/TwitchIcon.png";
import { useParams, Link } from 'react-router-dom';

const ViewProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Access the "id" parameter from the URL
  const { user_id } = useParams();

  // Get and destructure the auth slice
  const { user, friends } = useSelector((state) => state.auth);
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

  // Viewing friends
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);

  const openFriendsModal = () => {
    setIsFriendsModalOpen(true);
  };

  const closeFriendsModal = () => {
    setIsFriendsModalOpen(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    //If no user is logged in redirect to the login page
    if (!user) {
      navigate("/login");
    }

    dispatch(getProfileWithId(user_id));
    dispatch(getFriendsWithId(user_id));

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch, user_id]);

  // Render an error message if there was an error
  if (isError) {
    return <div>Error: {message}</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }
  
  return (
    <div className="profile-container">
      <div className="pic-name-bio-section">
        <div className="profile-picture-section">
            <>
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            </>
        </div>

        <div className="name-bio-section">
          <h1 className="name-section">{userName}</h1>
          <p className="bio-section">
              <div className="bio-input">
                <p>{bio}</p>
              </div>
          </p>
        </div>
      </div>
      <div className="socials-section">
        <h2>Socials</h2>
          <div className="socials">
            {socials &&
              socials.map((social, index) => (
                <p key={index}>
                  {social.social === "instagram" && (
                    <a
                      className="IG-link"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      <img src={InstagramIcon} alt="IG-icon" />
                    </a>
                  )}
                  {social.social === "twitter" && (
                    <a
                      className="Twitter-link"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      <img src={TwitterIcon} alt="Twitter" />
                    </a>
                  )}
                  {social.social === "tiktok" && (
                    <a
                      className="TikTok-link"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      <img src={TikTokIcon} alt="Tiktok" />
                    </a>
                  )}
                  {social.social === "youtube" && (
                    <a
                      className="YouTube-link"
                      href={social.url}
                      >
                      <img src={YoutubeIcon} alt="Youtube" />
                    </a>
                  )}
                  {social.social === "twitch" && (
                    <a
                      className="Twitch-link"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      <img src={TwitchIcon} alt="Twitch" />
                    </a>
                  )}
                </p>
              ))}
          </div>
      </div>

      <div>
        <button onClick={openFriendsModal}>
          {friends.length} friend(s)
        </button>
        <Modal
          isOpen={isFriendsModalOpen}
          onRequestClose={closeFriendsModal}
          className="modal"
          overlayClassName="modal-overlay"
          contentLabel="Friends">
          <div className="modal-header">
            <h2>Friends</h2>
            <button className="edit-button" onClick={closeFriendsModal}>
              Close
            </button>
          </div>
          <>
            {friends.map((friend) => (
                <ZombieFriend 
                  key={friend._id}
                  friend={friend}
                  closeFriendsModal={closeFriendsModal}
                />
            ))}
          </>
        </Modal>
      </div>

      <div className="games-section">
        <h2>Games</h2>
        <div className="games-list">
          {games &&
            games.map((game, index) => (
              <div key={index} className="game-info">
                <div className="game-line">
                  <h3>{game.name}</h3>
                  <img
                    src={
                      game.name === "Valorant"
                        ? valorantLogos[game.name]
                        : game.name === "Overwatch"
                        ? overwatchLogos[game.name]
                        : null
                    }
                    alt="game"
                    className="game-logo"
                  />
                </div>
                <p>{game.ign}</p>
                <div>
                  <img
                    src={
                      game.name === "Valorant"
                        ? valorantLogos[game.rank]
                        : game.name === "Overwatch"
                        ? overwatchLogos[game.rank]
                        : null
                    }
                    alt="game"
                    className="game-logo"
                  />
                  <p>{game.rank}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;