import React from "react";

const NonFriendUser = ({ nonFriendUser, handleAddFriend, handleBlock }) => {
  const handleAddFriendUser = () => {
    handleAddFriend(nonFriendUser._id);
  };

  const handleBlockUser = () => {
    console.log('handleBlockUser' + nonFriendUser._id)
    handleBlock(nonFriendUser._id);
  };

  return (
    <div className={"friend-request"}>
      <div className="friend-request-user-details">
        <img
          className="friend-request-pfp"
          src={nonFriendUser.profilePicture}
          alt="profile"
        />
        <div className="friend-request-username">
          {nonFriendUser.userName}
        </div>
      </div>
      <button className="btn" onClick={handleAddFriendUser}>Add Friend</button>
      <button className="btn" onClick={handleBlockUser}>Block User</button>
    </div>
  );
};

export default NonFriendUser;