import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  reset,
  updateProfile,
} from "../features/profile/profileSlice";
import { valorantLogos } from "../logos/valorantLogo";
import { overwatchLogos } from "../logos/overwatchLogo";
import Modal from "react-modal";
import ValorantGameForm from "../components/ValorantGameForm";
import OverwatchGameForm from "../components/OverwatchGameForm";
import Spinner from "../components/Spinner";
import { readAndCompressImage } from "browser-image-resizer";
import Socials from "../components/Socials";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get and destructure the auth slice
  const { user } = useSelector((state) => state.auth);
  // Get and destructure the profile slice
  const {
    profileId,
    bio,
    profilePicture,
    location,
    games,
    socials,    
    isLoading,
    isError,
    message    
  } = useSelector((state) => state.profile);

  const [edit, setEdit] = useState(false);
  const [editBio, setEditBio] = useState(bio);
  const [editPicture, setEditPicture] = useState(profilePicture);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalGame, setModalGame] = useState("");

  const editProfile = () => {
    setEdit(true);
    setEditBio(bio);
    setEditPicture(profilePicture);
  };

  const confirmEdit = () => {
    const profileData = {
      bio: editBio,
      profilePicture: editPicture,
      location: location,
      games: games,
      socials: socials,
    };

    dispatch(
      updateProfile({ profileId: profileId, profileData })
    );
    setEdit(false);
  };

  const handleBioChange = (e) => {
    setEditBio(e.target.value);
  };

  const handleChangePicture = async (e) => {
    const file = e.target.files[0];
    const config = {
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
    };

    const resizedImage = await readAndCompressImage(file, config);

    const base64 = await convertToBase64(resizedImage);
    setEditPicture(base64);
  };

  // convert image into base 64 format
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleModalGameChange = (game) => {
    setModalGame(game);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    //If no user is logged in redirect to the dashboard
    if (!user) {
      navigate("/");
    }

    dispatch(getProfile());

    setEditBio(bio);
    setEditPicture(profilePicture);
  
  }, [user, isError, message, navigate, dispatch, isModalOpen]);

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
          {edit ? (
            <>
              <img
                src={
                  editPicture
                }
                alt="Profile"
                className="profile-picture"
              />
              <input
                className="file-upload"
                type="file"
                onChange={handleChangePicture}
              />
            </>
          ) : (
            <>
              <img
                src={
                  profilePicture
                }
                alt="Profile"
                className="profile-picture"
              />
            </>
          )}
        </div>

        <div className="name-bio-section">
          <h1 className="name-section">name</h1>
          <p className="bio-section">
            {edit ? (
              <div className="bio-input">
                <textarea value={editBio} onChange={handleBioChange} />
              </div>
            ) : (
              bio
            )}
          </p>
        </div>
      </div>

      {edit === false ? (
        <button className="edit-button" onClick={editProfile}>
          Edit Profile
        </button>
      ) : (
        <button className="edit-button" onClick={confirmEdit}>
          Confirm
        </button>
      )}

      <button className="edit-button" onClick={openModal}>
        Link Account
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Link Account">
        <div className="modal-header">
          <h2>Link Account</h2>
          <button className="edit-button" onClick={closeModal}>
            Close
          </button>
        </div>
        <div className="game-options">
          <div onClick={() => handleModalGameChange("Valorant")}>
            <img
              src={valorantLogos["Valorant"]}
              alt="Valorant"
              className="game-logo"
            />
            Valorant
          </div>
          <div onClick={() => handleModalGameChange("Overwatch")}>
            <img
              src={overwatchLogos["Overwatch"]}
              alt="Overwatch"
              className="game-logo"
            />
            Overwatch
          </div>
        </div>
        {modalGame === "Valorant" ? (
          <ValorantGameForm closeModal={closeModal} />
        ) : null}
        {modalGame === "Overwatch" ? (
          <OverwatchGameForm closeModal={closeModal} />
        ) : null}
      </Modal>

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
      <div className="socials-section">
        <h2>Socials</h2>
        <Socials />
        {/* socials && {socials.map((social, index) => (
          <p key={index}>
            {social.name}: <a href={social.url}>{social.url}</a>
          </p>
        ))} */}
      </div>
    </div>
  );
};

export default Profile;
