import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
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

const Profile = () => {
  const dispatch = useDispatch();

  // Select necessary state from the store
  const { bio, name, profilePicture, socials, games, isError, message } =
    useSelector((state) => state.profile);

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

  const handleModalGameChange = (game) => {
    setModalGame(game);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmEdit = () => {
    dispatch(
      updateProfile("648a307ad4f77bff86785f2a", {
        bio: editBio,
        profilePicture: editPicture,
        name,
        socials,
        games,
      })
    );
    setEdit(false);
  };

  const handleBioChange = (e) => {
    setEditBio(e.target.value);
  };

  const handlePictureChange = (e) => {
    setEditPicture(e.target.value);
  };

  useEffect(() => {
    if (edit === true) {
    }
  }, [edit]);

  useEffect(() => {
    dispatch(getProfile("648a307ad4f77bff86785f2a"));

    // Clear the state when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isModalOpen]);

  // Render an error message if there was an error
  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className="profile-container">
      <div className="pic-name-bio-section">
        <div className="profile-picture-section">
          {edit ? (
            <>
              <img
                src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="Profile"
                className="profile-picture"
              />
              <input type="file" onChange={handlePictureChange} />
            </>
          ) : (
            <img
              src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="Profile"
              className="profile-picture"
            />
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
        {modalGame === "Valorant" ? <ValorantGameForm closeModal={closeModal} /> : null}
        {modalGame === "Overwatch" ? <OverwatchGameForm closeModal={closeModal} /> : null}
      </Modal>

      <div className="games-section">
        <h2>Games</h2>
        <div className="games-list">
          {games.map((game, index) => (
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
        {socials.map((social, index) => (
          <p key={index}>
            {social.name}: <a href={social.url}>{social.url}</a>
          </p>
        ))}
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
    </div>
  );
};

export default Profile;
