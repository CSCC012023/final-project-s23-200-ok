import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import FriendRequest from "../components/FriendRequest";
import {
  respondToFriendRequest,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
  deleteFriendRequest,
  reset
} from "../features/friendRequests/friendRequestsSlice";
import { createChat } from "../features/chat/chatSlice";

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { 
    incomingFriendRequests, 
    outgoingFriendRequests, 
    isLoading,
    isError, 
    message 
  } = useSelector((state) => state.friendRequests);

  const handleAccept = (friendRequest) => {
    dispatch(respondToFriendRequest({
      friendRequestId: friendRequest._id,
      newStatus: "accepted"
    }));

    dispatch(
      createChat(
        {
          user_id: friendRequest.sender_user_id,
          user_name: friendRequest.sender_userName,
          other_user_id: friendRequest.recipient_user_id,
          other_user_name: friendRequest.recipient_userName
        }
      )
    );
  };

  const handleDecline = (id) => {
    dispatch(respondToFriendRequest({
      friendRequestId: id,
      newStatus: "rejected"
    }));
  };

  const handleCancel = (id) => {
    dispatch(deleteFriendRequest(id));
  };

  useEffect(() => {
    dispatch(getIncomingFriendRequests());
    dispatch(getOutgoingFriendRequests());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    //If no user is logged in redirect to the login page
    if (!user) {
      navigate("/login");
    }
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <>
      <h3>Incoming</h3>
      {incomingFriendRequests.map((incomingFriendRequest) => (
        <FriendRequest 
          key={incomingFriendRequest._id}
          friendRequest={incomingFriendRequest}
          isOutgoing={false}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
        />
      ))}

      <h3>Outgoing</h3>
      {outgoingFriendRequests.map((outgoingFriendRequest) => (
        <FriendRequest 
          key={outgoingFriendRequest._id}
          friendRequest={outgoingFriendRequest}
          isOutgoing={true}
          handleCancel={handleCancel}
        />
      ))}
    </>
  );

};

export default Notifications;