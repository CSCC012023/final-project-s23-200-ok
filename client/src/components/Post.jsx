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

    const checkUserReaction = (i) => {
      if (post.likes[i].user.toString() === user._id) {
        setUserReaction(post.likes[i].reaction);
      }
    };

    for (var i = 0; i < post.likes.length; i++) {
      var reaction = post.likes[i].reaction;
      reactionCount[reaction]++;
      if (userReaction === '') {
        checkUserReaction(i);
      }
    }

    return reactionCount;
  }, [post, user, userReaction]);

  const handleReactionButtonClick = () => {
    if (!reactBtnClicked) {
      setReactBtnClicked(true);
    } else { 
      setReactBtnClicked(false);
    }
  };

  const generateReactionCount = () => {
    const reactions = ['like', 'heart', 'laugh', 'fire', 'sad', 'skull'];

    const checkUserReaction = (reaction) => {
      if (reaction === userReaction) {
        return true;
      } else {
        return false;
      }
    };

    const reactionElements = reactions.map(reaction => (
      <div key={reaction} className={"reaction-count-container"}>
        <img src={reactionEmojis[reaction]} alt={reaction} />
        <span className={`${checkUserReaction(reaction) ? 'reaction-value-hl' : 'reaction-value'}`}>{reactionCounter[reaction]}</span>
      </div>
    ));
  
    return reactionElements;
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
        <button className='btn' onClick={() => handleReactionButtonClick()}>React</button>
        <Reactions key={post._id} post={post} visible={reactBtnClicked} />
        {post.user_id === user._id && (
          // delete button
          <button className='btn' onClick={handleDeletePost}>Delete</button>
        )}
      </div>
    </div>
  );
};
export default Post;
