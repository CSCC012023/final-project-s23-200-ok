import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import NonFriendUser from "../components/NonFriendUser";
import {
  getNonFriendUsers,
  createFriendRequest,
  reset
} from "../features/friendRequests/friendRequestsSlice";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    nonFriendUsers,
    isLoading,
    isError, 
    message 
  } = useSelector((state) => state.friendRequests);

  const handleAddFriend = (id) => {
    dispatch(createFriendRequest(id));
  };

  useEffect(() => {
    dispatch(getNonFriendUsers());

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
      <h3>Add friends</h3>
      {nonFriendUsers.map((nonFriendUser) => (
        <NonFriendUser 
          key={nonFriendUser._id}
          nonFriendUser={nonFriendUser}
          handleAddFriend={handleAddFriend}
        />
      ))}
    </>
  );

};

export default Search;