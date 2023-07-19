import React from 'react'
import { useSelector } from 'react-redux'

const Message = ({ key, message, calculateTime }) => {

    const { user } = useSelector((state) => state.auth);

    const isSentByCurrentUser = () => {
        return message.sender_user_id === user._id;
    }


  return (
    <div className={ isSentByCurrentUser() ? "message-item-own" : "message-item-other"} key={key}>
            <div className="message-meta">{`${message.sender_user_name} • ${calculateTime(message.date)}`}</div>
            <div className="message-content">{message.message}</div>
    </div>
  )
}

export default Message