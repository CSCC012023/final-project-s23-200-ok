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
    file : "",
  });

  const handleInputChange = (e) => {  
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange =  async (e) => {

    const file = e.target.files[0];
    if (!file){
      setNewPost({
        ...newPost,
        image: "",
      });
      return;
    }

    const config = {
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
    };

    const allowFiles=["image/jpeg", "image/png", "image/gif", "video/mp4"];
    // console.log(file.type);
    if (!allowFiles.includes(file?.type)  ){
        console.log("invalid type " + file.type);
        return;
    }

    if (file.type.substring(0,5) === "image"){
      const resizedImage = await readAndCompressImage(file, config);

      const base64 = await convertToBase64(resizedImage);

      setNewPost({
        ...newPost,
        image: base64,
      });
    }
    else{
      console.log(newPost);
      let form = new FormData();
      for (var key in newPost){
        console.log(key+" "+newPost[key]);
        if (key === "file"){
          console.log(123);
          form.append("PostFile", file);
          continue;
        }
        form.append(key, newPost[key])
      }

      // print form
      for (var pair of form.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
      setNewPost(form);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log(newPost);
    // for (var pair of newPost?.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]); 
    // }

    var form = newPost;

    // requet using fetch, 
    if (form instanceof FormData){
      
      // let form = newPost;
      form.append("user_id", user._id);
      form.append("userName", user.userName);
      
      // const headers= {
      //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjZkZTkwY2U4NzdkMDhkNTIxYjhkYSIsImlhdCI6MTY4OTg3ODQ1OCwiZXhwIjoxNjg5OTA4NDU4fQ.WFnDSS7DblMlDcQ8YVu_KEA9unkI9S5Rr0Ae1TKuzuo`
      // }

      // only debug purpose
      console.log("ready form");
      for (var pair of newPost?.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

      // await fetch("http://localhost:5000/api/posts/", {
      //   method: 'post',
      //   headers,
      //   body: form,
      // });
    }
    else{ // request normally
      form = { ...form, user_id: user._id,userName: user.userName,}
      // dispatch(createPost(form));

    }
    console.log(form);
    dispatch(createPost(form));

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
                // name="image"
                // accept="image/*"
                className="file-upload"
                onChange={handleFileChange}
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