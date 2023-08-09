import React from "react";
import { Link } from "react-router-dom";

const Friend = ({ user, friend, handleUnfriend, handleBlock, closeFriendsModal }) => {
  const handleUnfriendFriend = () => {
    handleUnfriend(friend.user_id);
  };

  const handleBlockUser = () => {
    handleBlock(friend.user_id);
  };

  const blockButton = () => {
    const isBlocked = user.blockedUsers.includes(friend.user_id);
  
    return (
      <button className="btn" onClick={handleBlockUser}>
        {isBlocked ? "Unblock User" : "Block User"}
      </button>
    );
  };

  return (
    <div className={"friend-request"}>
      <div className="friend-request-user-details">
        <img
          className="friend-request-pfp"
          src={friend.profilePicture}
          alt="profile"
        />
        <div className="friend-request-username">
          {friend.userName}
        </div>
      </div>
      <Link to={`/profile/${friend.user_id}`}>
        <button className="btn" onClick={closeFriendsModal}>View Profile</button>
      </Link>
      <button className="btn" onClick={handleUnfriendFriend}>Unfriend</button>
      {blockButton()}
    </div>
  );
};

export default Friend;