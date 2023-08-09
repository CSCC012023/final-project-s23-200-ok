import React from "react";
import { Link } from 'react-router-dom';


const NonFriendUser = ({ user, nonFriendUser, handleAddFriend, handleBlock }) => {
  const handleAddFriendUser = () => {
    handleAddFriend(nonFriendUser._id);
  }; 

  const handleBlockUser = () => {
    handleBlock(nonFriendUser._id);
  };

  const blockButton = () => {
    const isBlocked = user.blockedUsers.includes(nonFriendUser._id);
  
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
          src={nonFriendUser.profilePicture}
          alt="profile"
        />
        <div className="friend-request-username">
          {nonFriendUser.userName}
        </div>
      </div>     
      {!user.blockedUsers.includes(nonFriendUser._id) && (
      <>
        <Link to={`/profile/${nonFriendUser._id}`}>
          <button className="btn" style={{marginRight: "100px"}}>View Profile</button>
        </Link> 
        <button className="btn" onClick={handleAddFriendUser}>
          Add Friend
        </button>
      </>
    )}
    {blockButton()}
    </div>
  );
};

export default NonFriendUser;