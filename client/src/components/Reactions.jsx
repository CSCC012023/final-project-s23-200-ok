import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { reactionEmojis } from '../reactions/reactionEmojis';
import { reactToPost } from "../features/posts/postSlice";

const Reactions = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [reactBtnClicked, setReactBtnClicked] = useState(false);
  const reactionsContainerRef = useRef(null);

  const handleReactionClick = (reaction) => {
    dispatch(reactToPost({postId: post._id, reaction}));
    setReactBtnClicked(false);
  }

  const handleOutsideClick = (e) => {
    if (
      reactionsContainerRef.current &&
      !reactionsContainerRef.current.contains(e.target)
    ) {
      setReactBtnClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <button onClick={() => setReactBtnClicked(true)}>React</button>
      {reactBtnClicked && (
        <div className="reactionsContainer" ref={reactionsContainerRef}>
          <img src={reactionEmojis['like']} alt='like' onClick={() => handleReactionClick('like')}/>
          <img src={reactionEmojis['heart']} alt='heart' onClick={() => handleReactionClick('heart')}/>
          <img src={reactionEmojis['laugh']} alt='laugh' onClick={() => handleReactionClick('laugh')}/>
          <img src={reactionEmojis['fire']} alt='fire' onClick={() => handleReactionClick('fire')}/>
          <img src={reactionEmojis['sad']} alt='sad' onClick={() => handleReactionClick('sad')}/>
          <img src={reactionEmojis['skull']} alt='skull' onClick={() => handleReactionClick('skull')}/>
        </div>
      )}
    </div>
  );
}

export default Reactions;
