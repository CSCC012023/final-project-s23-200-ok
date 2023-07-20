import React from "react";

const FriendRequest = ({ friendRequest, isOutgoing, handleAccept, handleDecline, handleCancel }) => {
  const handleAcceptRequest = () => {
    handleAccept(friendRequest._id);
  };

  const handleDeclineRequest = () => {
    handleDecline(friendRequest._id);
  };

  const handleCancelRequest = () => {
    handleCancel(friendRequest._id);
  };

  return (
    <div className={"friend-request"}>
      {isOutgoing ? (
        <>
          <div className="friend-request-user-details">
            <img
              className="friend-request-pfp"
              src={friendRequest.recipient_profilePicture}
            />
            <div className="friend-request-username">
              {friendRequest.recipient_userName}
            </div>
          </div>

          <div className="friend-request-buttons">
            <button className="btn" onClick={handleCancelRequest}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="friend-request-user-details">
            <img
              className="friend-request-pfp"
              src={friendRequest.sender_profilePicture}
            />
            <div className="friend-request-username">
              {friendRequest.sender_userName}
            </div>
          </div>

          <div className="friend-request-buttons">
            <button className="btn" onClick={handleAcceptRequest}>Accept</button>
            <button className="btn" onClick={handleDeclineRequest}>Decline</button>
          </div>
        </>
      )}
    </div>
  );
};

export default FriendRequest;