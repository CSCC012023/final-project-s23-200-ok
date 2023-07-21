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

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { 
    incomingFriendRequests, 
    outgoingFriendRequests, 
    isLoading, 
    isSuccess, 
    isError, 
    message 
  } = useSelector((state) => state.friendRequests);

  const handleAccept = (id) => {
    dispatch(respondToFriendRequest({
      friendRequestId: id,
      newStatus: "accepted"
    }));
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