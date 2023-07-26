import React from "react";

const NonFriendUser = ({ user, handleAddFriend }) => {
  const handleAddFriendUser = () => {
    handleAddFriend(user._id);
  };

  return (
    <div className={"friend-request"}>
      <div className="friend-request-user-details">
        <img
          className="friend-request-pfp"
          src={user.profilePicture}
        />
        <div className="friend-request-username">
          {user.userName}
        </div>
      </div>
      <button className="btn" onClick={handleAddFriendUser}>Add Friend</button>
    </div>
  );
};

export default NonFriendUser;