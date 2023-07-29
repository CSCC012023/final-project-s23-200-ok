import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/en";
import { reactionEmojis } from '../reactions/reactionEmojis';
import { reactToPost } from "../features/posts/postsSlice";

// temp, change to redux stuff later i guess
import ReactPlayer from 'react-player';


const Post = ({ post, handleDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const [reactBtnClicked, setReactBtnClicked] = useState(false),
        [userReaction, setUserReaction] = useState('');
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
    const getVideo = async function () {
      if (post.file){
        let fileid =  post.file;
        let url = "http://localhost:8080/api/files/".concat(fileid)
        let data = await fetch(url, 
          {
            method: 'GET',
          }
        );
        // console.log(data);
        setVideoUrl(data.url)
      }
    }
    getVideo();

  }, [])
  const reactionCounter = useMemo(() => {
    const reactionCount = {
      like: 0,
      heart: 0,
      laugh: 0,
      fire: 0,
      sad: 0,
      skull: 0
    };

    const checkUserReaction = (usrReaction) => {
      if (usrReaction.user.toString() === user._id) {
        setUserReaction(usrReaction.reaction);
      }
    };

    post.likes.forEach((usrReaction) => {
      reactionCount[usrReaction.reaction]++;
      if (userReaction === '') {
        checkUserReaction(usrReaction);
      }
    });

    return reactionCount;
  }, [post, user, userReaction]);

  const handleReactionButtonClick = () => {
    if (!reactBtnClicked) {
      setReactBtnClicked(true);
    } else { 
      setReactBtnClicked(false);
    }
  };

  const handleReactionClick = (reaction) => {
    dispatch(reactToPost({postId: post._id, reaction}));
    if (reaction === userReaction) {
      setUserReaction('React');
    } else setUserReaction(reaction);
  };

  const checkUserReacted = (reaction) => {
    if (reaction === userReaction) {
      return true;
    } else {
      return false;
    }
  };

  const generateReactionCount = () => {
    const reactions = ['like', 'heart', 'laugh', 'fire', 'sad', 'skull'];

    const reactionElements = reactions.map(reaction => (
      <div key={reaction} className={"reaction-count-container"} onClick={() => handleReactionClick(reaction)}>
        <img src={reactionEmojis[reaction]} alt={reaction} />
        <span className={`${checkUserReacted(reaction) ? reaction : 'reaction-value'}`}>
          {reactionCounter[reaction]}
        </span>
      </div>
    ));
  
    return reactionElements;
  };

  const reactButtonContents = () => {
    if (userReaction === '') {
      return <button className='btn' onClick={() => handleReactionButtonClick()}>React</button>;
    } else {
      const buttonElement = (
        <button className='btn' onClick={() => handleReactionButtonClick()}>
          {userReaction}
        </button>
      );
      return buttonElement;
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-user-name">{post.userName}</span>
        <p className="post-date">{calculateTime(post.date)}</p>
      </div>
      <div className="post-body">
        {post.image && <img src={post.image} alt="post" className="post-image" />}
        {post.file && 
              <ReactPlayer 
                url={videoUrl} 
                width='100%'
                height='100%'
                controls/>             
          }

        <div className="post-text">
          <p>{post.text}</p>
        </div>
      </div>

      <div className="reaction-count-wrapper">
        {generateReactionCount()}
      </div>

      <div className="post-footer"> 
        {post.user_id === user._id && (
          // delete button
          <button className='btn' onClick={handleDeletePost}>Delete</button>
        )}
      </div>
    </div>
  );
};
export default Post;
