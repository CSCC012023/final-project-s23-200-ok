import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPosts, createPost } from "../features/posts/postSlice";
import { readAndCompressImage } from "browser-image-resizer";
import Spinner from "../components/Spinner";
import Post from "../components/Post";


function Dashboard() {
  const dispatch = useDispatch();

  const {posts, isLoading, isError, message} = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const [newPost, setNewPost] = useState({
    content : "",
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

    console.log(newPost);
    console.log(user._id);
    console.log(user.userName);

    dispatch(createPost({ ...newPost, user_id: user._id,
      userName: user.userName, }));

    };

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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {message}</div>;
  }


  return(
    <>
      <section className="heading">Dashboard</section>
      {user && (
        <section className="create-post">
          <form onSubmit={handlePostSubmit} className="form-group">
            <textarea
              name="content"
              placeholder="What's on your mind?"
              value={newPost.content}
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
      )}
      {posts &&  posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}

    </> 
  );

}

export default Dashboard;