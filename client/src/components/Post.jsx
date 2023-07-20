import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/en";
import Reactions from "./Reactions";
import { reactionEmojis } from '../reactions/reactionEmojis';

const Post = ({ post, handleDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const [reactBtnClicked, setReactBtnClicked] = useState(false),
        [userReaction, setUserReaction] = useState('');

  const calculateTime = (date) => {
    dayjs.extend(relativeTime).locale(localeEn);
    return dayjs(date).fromNow();
  };

  const handleDeletePost = () => {
    handleDelete(post._id)
  };

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
      <div key={reaction} className={"reaction-count-container"}>
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
        <div className="post-text">
          <p>{post.text}</p>
        </div>
      </div>

      <div className="reaction-count-container">
        {generateReactionCount()}
      </div>

      <div className="post-footer"> 
        {reactButtonContents()}
        {post.user_id === user._id && (
          // delete button
          <button className='btn' onClick={handleDeletePost}>Delete</button>
        )}
      </div>
      <Reactions key={post._id} post={post} visible={reactBtnClicked} setUserReaction={setUserReaction} userReaction={userReaction} />
    </div>
  );
};

export default Post;
