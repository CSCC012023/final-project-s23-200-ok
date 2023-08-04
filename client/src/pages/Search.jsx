import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import NonFriendUser from "../components/NonFriendUser";
import {
  getNonFriendUsers,
  createFriendRequest,
  reset
} from "../features/friendRequests/friendRequestsSlice";
import { blockUser } from "../features/auth/authSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";

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

  const [searchQuery, setSearchQuery] = useState("");

  const getFilteredNonFriendUsers = () => {
    return nonFriendUsers.filter(nonFriendUser => 
      nonFriendUser.userName.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleAddFriend = (id) => {
    dispatch(createFriendRequest(id));
  };

  const handleBlock = (id) => {
    console.log('handleBlock' + id);
    dispatch(blockUser(id));
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
  }, [navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <>
      <p className="heading">Add friends</p>

      <div className="search-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search users by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-button" onClick={handleClearSearch}>
              <AiOutlineCloseCircle />
            </button>
          )}
        </div>
      </div>

      {getFilteredNonFriendUsers().length > 0 ? (
        getFilteredNonFriendUsers().map((nonFriendUser) => (
          <NonFriendUser 
            key={nonFriendUser._id}
            nonFriendUser={nonFriendUser}
            handleAddFriend={handleAddFriend}
            handleBlock={handleBlock}
          />
        ))
      ) : (
        <h3>No such users</h3>
      )
      }
    </>
  );

};

export default Search;