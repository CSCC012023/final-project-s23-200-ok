import React from "react";
import { Link } from "react-router-dom";

const ZombieFriend = ({ friend, closeFriendsModal }) => {

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
      <Link to={`/profile/${friend.user_id}`}>
        <button className="btn" onClick={closeFriendsModal}>View Profile</button>
      </Link>
    </div>
  );
};

export default ZombieFriend;