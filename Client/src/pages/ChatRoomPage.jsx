import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ChatBox from "../components/chatbox/chatBox";
import MessageInput from "../components/MessageInput";
import OnlineUsers from "../components/onlineUsers";
import axios from "../api/axios";

const ChatRoomPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/chats/${roomId}`);
        setMessages(response);
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    const fetchOnlineUsers = async () => {
      try {
        const response = await axios.get(`/rooms/${roomId}/users`);
        setOnlineUsers(response);
      } catch (error) {
        console.error("Error fetching online users:", error.message);
      }
    };

    fetchMessages();
    fetchOnlineUsers();
  }, [roomId]);

  const handleSendMessage = async ({ text, image }) => {
    try {
      const newMessage = {
        roomId,
        text,
        image,
      };
      const response = await axios.post("/chats/send", newMessage);
      setMessages([...messages, response]);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex", padding: "16px" }}>
        <div style={{ flex: 2, marginRight: "16px" }}>
          <ChatBox messages={messages} currentUserId="current-user-id" />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
        <div style={{ flex: 1 }}>
          <OnlineUsers users={onlineUsers} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
