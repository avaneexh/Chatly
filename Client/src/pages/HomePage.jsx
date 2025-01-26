import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const HomePage = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/chat/${roomId}`);
    } else {
      alert("Please enter a valid Room ID.");
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "16px", textAlign: "center" }}>
        <h1>Welcome to Real-Time Chat App</h1>
        <p>Enter a Room ID to join a chat room.</p>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "8px",
          }}
        />
        <button
          onClick={handleJoinRoom}
          style={{
            padding: "8px 16px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default HomePage;
