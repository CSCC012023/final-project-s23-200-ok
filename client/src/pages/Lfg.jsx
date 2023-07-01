import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
  reset,
} from "../features/lfg/lfgSlice";
import LfgPost from "../components/LfgPost";
import Spinner from "../components/Spinner";

const Lfg = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.lfg
  );
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState("");

  const [newPost, setNewPost] = useState({
    game: "",
    notes: "",
    server: "",
    status: "",
    numberOfPlayers: "",
    rank: "",
  });

  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (isEditing) {
        console.log("isEditing", isEditing)
        dispatch(updatePost({postId: isEditing, postData: { ...newPost, user_id: user._id, userName: user.userName } }));
        setIsEditing("");
        setNewPost({
            game: "",
            notes: "",
            server: "",
            status: "",
            numberOfPlayers: "",
            rank: "",
          });
    } else {
      dispatch(
        createPost({ ...newPost, user_id: user._id, userName: user.userName })
      );
      setNewPost({
        game: "",
        notes: "",
        server: "",
        status: "",
        numberOfPlayers: "",
        rank: "",
      });
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (isEditing) {
      posts.find((post) => post._id === isEditing && setNewPost(post));
    }
  }, [isEditing, posts]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }

  return (
    <div>
      {user && (
        <>
          {isEditing ? <h3>Edit Post</h3> : <h3>Create Post</h3>}

          <form className="form-group" onSubmit={handleSubmit}>
            <input
              type="text"
              name="game"
              value={newPost.game}
              onChange={handleInputChange}
              placeholder="Game"
              required
            />
            <textarea
              name="notes"
              value={newPost.notes}
              onChange={handleInputChange}
              placeholder="Notes"
            />
            <input
              type="text"
              name="server"
              value={newPost.server}
              onChange={handleInputChange}
              placeholder="Server"
              required
            />
            <input
              type="text"
              name="status"
              value={newPost.status}
              onChange={handleInputChange}
              placeholder="Status"
              required
            />
            <input
              type="number"
              name="numberOfPlayers"
              value={newPost.numberOfPlayers}
              onChange={handleInputChange}
              placeholder="Number of Players"
              required
            />
            <input
              type="text"
              name="rank"
              value={newPost.rank}
              onChange={handleInputChange}
              placeholder="Rank"
              required
            />
            <button className="btn" type="submit">
              {isEditing ? "Confirm Edit" : "Create Post"}
            </button>
          </form>
        </>
      )}
      <h1>Looking For Group</h1>
      <div className="lfg-buttons"></div>
      {posts.map((post) => (
        <LfgPost
          key={post._id}
          post={post}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      ))}
    </div>
  );
};

export default Lfg;
