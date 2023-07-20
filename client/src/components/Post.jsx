import React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/en";
import Reactions from "./Reactions";

// temp, change to redux stuff later i guess
import { useEffect, useState } from "react";
import { Player } from 'video-react'
// import '~video-react/dist/video-react.css'; 
<<<<<<< HEAD
<<<<<<< HEAD
import ReactPlayer from 'react-player'
=======
>>>>>>> e369e78 (connect frontned with video stream)
=======
import ReactPlayer from 'react-player'
>>>>>>> 707a7ac (display video complete)


const Post = ({ post, handleDelete }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const calculateTime = (date) => {
    dayjs.extend(relativeTime).locale(localeEn);
    return dayjs(date).fromNow();
  };


  const handleDeletePost = () => {
    handleDelete(post._id)
  };

  const [videoUrl, setVideoUrl] = useState('');

  useEffect( ()=> {
<<<<<<< HEAD
<<<<<<< HEAD
    console.log("useeffect called");
=======

>>>>>>> e369e78 (connect frontned with video stream)
=======
    console.log("useeffect called");
>>>>>>> 707a7ac (display video complete)
    const getVideo = async function () {
      if (post.file){
        let fileid =  post.file;
        let url = "http://localhost:5000/api/files/".concat(fileid)
        console.log(url)
        let data = await fetch(url, 
          {
            method: 'GET',
          }
        );
        console.log(data);
        setVideoUrl(data.url)
      }
    }
    getVideo();

<<<<<<< HEAD
<<<<<<< HEAD
  }, [])
=======
  })
>>>>>>> e369e78 (connect frontned with video stream)
=======
  }, [])
>>>>>>> 707a7ac (display video complete)

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-user-name">{post.userName}</span>
        <p className="post-date">{calculateTime(post.date)}</p>
      </div>
      <div className="post-body">
        {post.image && <img src={post.image} alt="post" className="post-image" />}
        {post.file && 

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 707a7ac (display video complete)

              <ReactPlayer 
                url={videoUrl} 
                width='100%'
                height='100%'
                controls/>   
            // <video controls>
            //   <source src={videoUrl} type="video/mp4" /> {/* Adjust the video type if necessary */}
            // </video>
<<<<<<< HEAD
=======
            <video controls>
              <source src={videoUrl} type="video/mp4" /> {/* Adjust the video type if necessary */}
            </video>
>>>>>>> e369e78 (connect frontned with video stream)
=======
>>>>>>> 707a7ac (display video complete)
          // <Player src={post.file} alt="post video" className="post-image">
          //   <source src={videoUrl} />
          // </Player>
          
          }

        <div className="post-text">
          <p>{post.text}</p>
        </div>
      </div>
        <Reactions key={post._id} post={post} />
      <div className="delete-post"> 

      {post.user_id === user._id && (
          // delete button
          <button className='btn' onClick={handleDeletePost}>Delete</button>
        )}
      </div>
    </div>
  );
};
export default Post;
