import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts, createPost, deletePost } from "../features/posts/postsSlice";
import { readAndCompressImage } from "browser-image-resizer";
import Spinner from "../components/Spinner";
import Post from "../components/Post";


function Dashboard() {
  const dispatch = useDispatch();

  const {posts, isLoading, isError, message} = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [text, setText] = useState("");
  const [file, setFile] = useState();
  const [isVideo, setIsVideo] = useState(false);


  const handleInputChange = (e) => {  
    setText(e.target.value);
  };

  const handleFileChange =  async (e) => {

    const newfile = e.target.files[0];
    if (!newfile){
      setFile(null);
      setIsVideo(false);
      return;
    }

    const config = {
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
    };

    const allowFiles=["image/jpeg", "image/png", "image/gif", "video/mp4"];
    if (!allowFiles.includes(newfile?.type)  ){
        console.log("invalid type " + newfile.type);
        return;
    }

    if (newfile.type.substring(0,5) === "image"){
      const resizedImage = await readAndCompressImage(newfile, config);

      const base64 = await convertToBase64(resizedImage);

      setFile(base64);
      setIsVideo(false);
    }
    else{
      setFile(newfile);
      setIsVideo(true);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log(file);

    var form = new FormData;

    // requet using fetch, 
    if (isVideo){
      form.append("user_id", user._id);
      form.append("userName", user.userName);
      form.append("PostFile", file);
      form.append("text", text);
    }
    else{ // request normally
      form = { text, image: file, user_id: user._id,userName: user.userName,}
    }
    console.log(form);
    dispatch(createPost(form));

    setText("");
    setFile();

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
                value={text}
                onChange={handleInputChange}
                required
              />
              <input
                type="file"
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
