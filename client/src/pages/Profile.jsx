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
import { valorantLogos } from "../logos/valorantLogo";
import { overwatchLogos } from "../logos/overwatchLogo";
import Modal from "react-modal";
import ValorantGameForm from "../components/ValorantGameForm";
import OverwatchGameForm from "../components/OverwatchGameForm";
import Friend from "../components/Friend";
import Spinner from "../components/Spinner";
import { readAndCompressImage } from "browser-image-resizer";
import SocialLinkForm from "../components/SocialLinkForm";
import InstagramIcon from "../assets/InstagramIcon.png";
import TwitterIcon from "../assets/TwitterIcon.png";
import TikTokIcon from "../assets/TikTokIcon.png";
import YoutubeIcon from "../assets/YoutubeIcon.png";
import TwitchIcon from "../assets/TwitchIcon.png";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // Editing profile - bio, pfp
  const [edit, setEdit] = useState(false);
  const [editBio, setEditBio] = useState(bio);
  const [editPicture, setEditPicture] = useState(profilePicture);

  // Linking games
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [modalGame, setModalGame] = useState("");
  const [inputText, setInputText] = useState("");

  // Sharing socials
  const [isSocialsModalOpen, setIsSocialsModalOpen] = useState(false);
  const [submittedLinks, setSubmittedLinks] = useState(socials);

  // Deleting profile 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Viewing friends
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);

  const handleBioChange = (e) => {
    setEditBio(e.target.value);
  };

  const handlePictureChange = async (e) => {
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
      socials: submittedLinks,
    };

    dispatch(updateProfile({ profileData }));
    setEdit(false);
  };

  const openGameModal = () => {
    setIsGameModalOpen(true);
  };

  const handleModalGameChange = (game) => {
    setModalGame(game);
  };

  const closeGameModal = () => {
    setIsGameModalOpen(false);
  };

  const openSocialsModal = () => {
    setIsSocialsModalOpen(true);
  };

  const closeSocialsModal = () => {
    setIsSocialsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  }

  const handleDeleteUser = async () => {
    if(inputText != userName){
      alert("Invalid username, try again.");
    } else {
      setIsDeleteModalOpen(false);
      await dispatch(deleteUserAccount(user._id));
      dispatch(logout());
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  const openFriendsModal = () => {
    setIsFriendsModalOpen(true);
  };

  const handleUnfriend = (id) => {
    dispatch(unfriend(id));
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

    dispatch(getProfile());
    dispatch(getFriends());

    setEditBio(bio);
    setEditPicture(profilePicture);

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch, isGameModalOpen]);

  useEffect(() => {
    setSubmittedLinks(socials);
  }, [socials]);

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
                src={editPicture}
                alt="Profile"
                className="profile-picture"
              />
              <input
                className="file-upload"
                type="file"
                onChange={handlePictureChange}
              />
            </>
          ) : (
            <>
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            </>
          )}
        </div>

        <div className="name-bio-section">
          <h1 className="name-section">{userName}</h1>
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
      <div className="socials-section">
        <h2>Socials</h2>
        {edit ? (
          <div className="update-socials-button">
            <button className="edit-button" onClick={openSocialsModal}>
              Update Socials
            </button>
          </div>
        ) : (
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
                      target="_blank">
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
        )}
        <Modal
          isOpen={isSocialsModalOpen}
          onRequestClose={closeSocialsModal}
          className="modal-dialog"
          overlayClassName="modal-overlay"
        >
          <SocialLinkForm
            socials={socials}
            submittedLinks={submittedLinks}
            setSubmittedLinks={setSubmittedLinks}
            closeSocialsModal={closeSocialsModal}></SocialLinkForm>
          <button className="edit-button" onClick={closeSocialsModal}>
            Close
          </button>
        </Modal>
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
              <Friend 
                key={friend._id}
                friend={friend}
                handleUnfriend={handleUnfriend}
              />
            ))}
          </>
        </Modal>
      </div>

      <button className="edit-button" onClick={openGameModal}>
        Link Account
      </button>

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
        <Modal
          isOpen={isGameModalOpen}
          onRequestClose={closeGameModal}
          className="modal"
          overlayClassName="modal-overlay"
          contentLabel="Link Account">
          <div className="modal-header">
            <h2>Link Account</h2>
            <button className="edit-button" onClick={closeGameModal}>
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
            <ValorantGameForm closeModal={closeGameModal} />
          ) : null}
          {modalGame === "Overwatch" ? (
            <OverwatchGameForm closeModal={closeGameModal} />
          ) : null}
        </Modal>
      </div>

      <div>
        <button className="edit-button" onClick={openDeleteModal}>Delete Account</button>
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Please enter <b>{userName}</b> to delete your Playbook account:</h2>
          <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
          />
          <button className="edit-button" onClick={handleDeleteUser}>Submit</button>
          <button className="edit-button" style={{marginLeft: "25px"}} onClick={closeDeleteModal}>Cancel</button>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
