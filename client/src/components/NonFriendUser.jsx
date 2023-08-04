import React from "react";
import { Link } from 'react-router-dom';


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
      <Link to={`/profile/${nonFriendUser._id}`}>
        <button className="btn" style={{marginRight: "100px"}}>View Profile</button>
      </Link>      
      <button className="btn" onClick={handleAddFriendUser}>Add Friend</button>
      <button className="btn" onClick={handleBlockUser}>Block User</button>
    </div>
  );
};

export default NonFriendUser;