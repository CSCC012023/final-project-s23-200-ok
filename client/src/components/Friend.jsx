import React from "react";

const Friend = ({ friend, handleUnfriend }) => {
  const handleUnfriendFriend = () => {
    handleUnfriend(friend.user_id);
  };

  return (
    <div className={"friend-request"}>
      <div className="friend-request-user-details">
        <img
          className="friend-request-pfp"
          src={friend.profilePicture}
        />
        <div className="friend-request-username">
          {friend.userName}
        </div>
      </div>
      <button className="btn" onClick={handleUnfriendFriend}>Unfriend</button>
    </div>
  );
};

export default Friend;