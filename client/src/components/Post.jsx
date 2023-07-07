import React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/en";
import Reactions from "./Reactions";

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
