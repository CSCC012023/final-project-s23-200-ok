import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, createMessage, addMessage } from "../features/message/messageSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localeEn from "dayjs/locale/en";
import Message from "../components/Message";


const socket = io("http://localhost:8080");

const ChatView = ({ chat }) => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const socketRef = useRef();
  const divRef = useRef(null);

  const calculateTime = (date) => {
    dayjs.extend(relativeTime).locale(localeEn);
    return dayjs(date).fromNow();
  };


  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "instant" });
  };


  const getOtherUser = () => {
    const firstUser = chat.user_ids_names[0];
    const secondUser = chat.user_ids_names[1];
    let user2Id;

    if (firstUser.user_id === user._id) {
      user2Id = secondUser.user_id;
    } else {
      user2Id = firstUser.user_id;
    }

    return user2Id;
  };


  useEffect(() => {
    dispatch(getMessages(chat._id));
  }, [dispatch, chat]);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  // socket useEffect
  useEffect(() => {
    socketRef.current = socket;

    const user2Id = getOtherUser();

    socketRef.current.emit("joinRoom", { user1Id: user._id, user2Id });

    socketRef.current.on("receiveMessage", (message) => {
      dispatch(addMessage(message));

      scrollToBottom();
    });

    return () => {
      socketRef.current.off("receiveMessage");
    };
  }, [chat, user]);



  const handleSendMessage = (event) => {
    event.preventDefault();
    const content = event.target.elements.message.value;

    const message = {
      sender_user_id: user._id,
      message: content,
      sender_user_name: user.userName,
      chatId: chat._id,
    };

    const user2Id = getOtherUser();

    dispatch(createMessage({ message }));

    socketRef.current.emit("newMessage", {
      user1Id: user._id,
      user2Id,
      message,
    });

    event.target.elements.message.value = "";

  };

  return (
    <div className="chat-view-container">
      <h2 className="chat-header">{chat.name}</h2>
      <ul className="chat-view-list">
        {messages.map((message, index) => (
          <Message key={index} message={message} calculateTime={calculateTime} />
        ))}
        <div ref={divRef} />
      </ul>
      <form onSubmit={handleSendMessage} className="chat-form">
        <input type="text" name="message" className="chat-view-input " />
        <button type="submit" className="chat-view-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatView;
