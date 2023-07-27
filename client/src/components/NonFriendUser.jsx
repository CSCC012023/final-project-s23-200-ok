import React from "react";

const NonFriendUser = ({ nonFriendUser, handleAddFriend }) => {
  const handleAddFriendUser = () => {
    handleAddFriend(nonFriendUser._id);
  };

  return (
    <div className={"friend-request"}>
      <div className="friend-request-user-details">
        <img
          className="friend-request-pfp"
          src={nonFriendUser.profilePicture}
        />
        <div className="friend-request-username">
          {nonFriendUser.userName}
        </div>
      </div>
      <button className="btn" onClick={handleAddFriendUser}>Add Friend</button>
    </div>
  );
};

export default NonFriendUser;