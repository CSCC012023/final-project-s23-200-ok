import React from "react";

const FriendRequest = ({ friendRequest, isOutgoing, handleAccept, handleDecline }) => {
  const handleAcceptRequest = () => {
    handleAccept(friendRequest._id);
  };

  const handleDeclineRequest = () => {
    handleDecline(friendRequest._id);
  };

  return (
    <div className={`friend-request ${isOutgoing ? "outgoing" : "incoming"}`}>
      <div className="friend-request-user-details">
        <img
          className="friend-request-pfp"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        />
        <div className="friend-request-username">
          Username
        </div>
      </div>
      <div className="friend-request-buttons">
        {isOutgoing ? (
          <button className="btn">Cancel</button>
        ) : (
          <>
            <button className="btn" onClick={handleAcceptRequest}>Accept</button>
            <button className="btn" onClick={handleDeclineRequest}>Decline</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;