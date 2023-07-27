import React, { useState, useEffect } from "react";
import ChatView from "../components/ChatView";
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../features/chat/chatSlice';

const Chat = ({chatAlert, setChatAlert, socketRef}) => {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null);
  const { chats } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.auth);

  const getOtherUserName = (chat) => {
    if (chat){
      const firstUser = chat.user_ids_names[0];
      const secondUser = chat.user_ids_names[1];
      let user2;

      if (firstUser.user_id === user._id) {
        user2 = secondUser;
      }
      else {
        user2 = firstUser;
      }

      return user2.user_name;
    }
  };

  useEffect(() => {
    dispatch(getChats(user._id));
  }, [dispatch]);

  return (
    <>
    <div className="chat-container">
      <div className="chat-list">
        {chats && chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${chat.id === selectedChat?.id ? 'active' : ''}`}
            onClick={() => setSelectedChat(chat)}
          >
            {getOtherUserName(chat)}
          </div>
        ))}
      </div>
      <div className="chat-view">
        {selectedChat ? <ChatView chat={selectedChat}  chatAlert={chatAlert}
                  setChatAlert={setChatAlert}
                  socketRef={socketRef}/> : "Select a chat"}
      </div>
    </div>
    </>
  );
};

export default Chat;
