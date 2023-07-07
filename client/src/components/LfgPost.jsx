import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localeEn from 'dayjs/locale/en'

const LfgPost = ({ post, setIsEditing, isEditing, handleDelete }) => {
    const { user } = useSelector((state) => state.auth);
    // for delete posts we can add allow the user to delete their own posts by checking if the user id matches the post user id
    // then we can dispatch the delete action
    const handleDeletePost = () => {
      handleDelete(post._id)
    };
    
    const calculateTime = (date) => {
        dayjs.extend(relativeTime).locale(localeEn);
        return dayjs(date).fromNow();
    };

    return (
      <div className='lfg-post'>
        <div className='lfg-post-header'>
          <span className='lfg-post-user-id'>{post.userName}</span>
          <p>{calculateTime(post.date)}</p>
          <span className={post.status === 'Open'? "lfg-post-status-open" : ( post.status === 'Closed' ? "lfg-post-status-closed" : "lfg-post-status-almost-full")}> { "• Status: " + post.status}</span>
        </div>
        <div className='lfg-post-body'>
          <div className='lfg-post-game'>Game: {post.game}</div>
          <div className='lfg-post-server'>Server: {post.server}</div>
          <div className='lfg-post-players'>Number of Players: {post.numberOfPlayers}</div>
          <div className='lfg-post-rank'>Rank: {post.rank}</div>
        </div>
        <div className='lfg-post-notes-container'>
        <div className='lfg-post-notes'>
          {post.notes}
        </div>

        {post.user_id === user._id && (
          // edit button
          <button className='btn' onClick={() => {
              if (isEditing) {
                  setIsEditing("")
              } else {
                  setIsEditing(post._id)
              }
          }}>Edit</button>
        )}
        {post.user_id === user._id && (
          // delete button
          <button className='btn' onClick={handleDeletePost}>Delete</button>
        )}

        </div>
      </div>
    );
  };
export default LfgPost