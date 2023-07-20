import React, { useRef } from 'react';
import { useDispatch } from "react-redux";
import { reactionEmojis } from '../reactions/reactionEmojis';
import { reactToPost } from "../features/posts/postsSlice";

const Reactions = ({ post, visible, setUserReaction, userReaction }) => {
  const dispatch = useDispatch();
  const reactionsContainerRef = useRef(null);

  const handleReactionClick = (reaction) => {
    dispatch(reactToPost({postId: post._id, reaction}));
    if (reaction === userReaction) {
      setUserReaction('React');
    } else setUserReaction(reaction);
  };

  return (
    <div>
      {visible && (
        <div className="reactions-container" ref={reactionsContainerRef}>
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
