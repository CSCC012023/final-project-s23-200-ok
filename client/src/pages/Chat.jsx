import React, { useState, useEffect } from "react";
import ChatView from "../components/ChatView";
import { useDispatch, useSelector } from 'react-redux';
import { getChats, createChat } from '../features/chat/chatSlice'; // path to your chat slice



const Chat = () => {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  const { chats } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.auth);

  //create a new chat with user id 64b6e2583992831debfb326e
  const newChat = () => {
    const chat = {
      user_id: user._id,
      user_name: user.userName,
      other_user_id: '64b6e2583992831debfb326e',
      other_user_name: 'chat2'
    };
    console.log(chat);
    dispatch(createChat(chat));
  };



  useEffect(() => {
    dispatch(getChats(user._id));
  }, [dispatch]);

  return (
    <>
    <button onClick={newChat}>New Chat</button>

    <div className="chat-container">
      <div className="chat-list">
        {chats && chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === selectedChat?.id ? 'active' : ''}`}
            onClick={() => setSelectedChat(chat)}
          >
            {chat._id}
          </div>
        ))}
      </div>
      <div className="chat-view">
        {selectedChat ? <ChatView chat={selectedChat} /> : "Select a chat"}
      </div>
    </div>
    </>
  );
};

export default Chat;
