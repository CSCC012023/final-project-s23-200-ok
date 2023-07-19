import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { getMessages, createMessage } from '../features/message/messageSlice';

const socket = io("http://localhost:5000");

const ChatView = ({ chat }) => {
  const dispatch = useDispatch();
  const [localMessages, setLocalMessages] = useState([]);
  const { messages } = useSelector(state => state.message);
  const { user } = useSelector(state => state.auth);
  const socketRef = useRef();

  useEffect(() => {
    dispatch(getMessages(chat._id));
    setLocalMessages(messages);
  }, [dispatch, chat]);


  useEffect(() => {
    socketRef.current = socket;

    const firstUser = chat.user_ids_names[0];
    const secondUser = chat.user_ids_names[1];
    let user2Id;
    
    if (firstUser.user_id === user._id) {
      user2Id = secondUser.user_id;
    } else {
      user2Id = firstUser.user_id;
    }

    console.log('user2Id', user2Id);
    console.log('user._id', user._id);

    socketRef.current.emit("joinRoom", { user1Id: user._id, user2Id });  // Replace 'chat.otherUserId' with actual other user's ID

    socketRef.current.on("receiveMessage", (message) => {
      setLocalMessages((prevMessages) => [...prevMessages, message]);
      // scroll to bottom of chat on new message
      const chat = document.querySelector('.chat-view-list');
      chat.scrollTop = chat.scrollHeight;
    });
    
    return () => {
      socketRef.current.off('receiveMessage');
    };
  }, [chat]);


  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const content = event.target.elements.message.value;

    const message = {
      sender_user_id: user._id,
      message: content,
      sender_user_name: user.userName,
      chatId: chat._id
    };

    const firstUser = chat.user_ids_names[0];
    const secondUser = chat.user_ids_names[1];
    let user2Id;
    
    if (firstUser.user_id === user._id) {
      user2Id = secondUser.user_id;
    } else {
    user2Id = firstUser.user_id;
    }
    

    dispatch(createMessage({message}));

    socketRef.current.emit("newMessage", { user1Id: user._id, user2Id, message });
    event.target.elements.message.value = '';
  };

  return (
    <div className="chat-view-container">
      <h2 className="chat-header">{chat.name}</h2>
      <ul className="chat-view-list">
        {localMessages.map((message, index) => (
          <li key={index} className="chat-list-item">
            <strong>{message.sender_user_name}:</strong> {message.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage} className="chat-form">
        <input type="text" name="message" className="chat-input" />
        <button type="submit" className="chat-button">Send</button>
      </form>
    </div>
  );
};

export default ChatView;
