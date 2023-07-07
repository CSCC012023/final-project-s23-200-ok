import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts, createPost, deletePost } from "../features/posts/postSlice";
import { readAndCompressImage } from "browser-image-resizer";
import Spinner from "../components/Spinner";
import Post from "../components/Post";


function Dashboard() {
  const dispatch = useDispatch();

  const {posts, isLoading, isError, message} = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [newPost, setNewPost] = useState({
    text : "",
    image : "",
  });

  const handleInputChange = (e) => {  
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange =  async (e) => {
    const file = e.target.files[0];
    const config = {
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
    };

    const resizedImage = await readAndCompressImage(file, config);

    const base64 = await convertToBase64(resizedImage);

    setNewPost({
      ...newPost,
      image: base64,
    });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost({ ...newPost, user_id: user._id,
      userName: user.userName, }));

    setNewPost({
      text: "",
      image: "",
    });

    };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getPosts());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return(
    <>
      {user ? (
        <>
          <section className="create-post">
            <form onSubmit={handlePostSubmit} className="form-group">
              <textarea
                name="text"
                placeholder="What's on your mind?"
                value={newPost.text}
                onChange={handleInputChange}
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                className="file-upload"
                onChange={handleImageChange}
              />
              <button type="submit" className="btn">Post</button>
            </form>
          </section>

          {posts && posts.map((post) => (
            <Post key={post._id} post={post} handleDelete={handleDelete}/>
          ))}
        </>
      ) : (
        <section className="heading">
          <p><u><Link to="/login">Login</Link></u> and see what your fellow gamers are up to!</p>
          <p>OR</p>
          <p><u><Link to="/register">Sign up</Link></u> to start using Playbook!</p>
        </section>
      ) }
    </> 
  );

}

export default Dashboard;