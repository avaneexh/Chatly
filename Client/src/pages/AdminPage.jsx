import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Header from "../components/Header";

const AdminPage = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/rooms");
        setRooms(response);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };
    fetchRooms();
  }, []);

  const handleViewRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div>
      <Header onLogout={() => navigate("/login")} />
      <div style={{ padding: "16px" }}>
        <h1>Admin Dashboard</h1>
        <div style={{ marginTop: "16px" }}>
          {rooms.length === 0 ? (
            <p>No rooms available</p>
          ) : (
            <ul>
              {rooms.map((room) => (
                <li key={room._id} style={{ marginBottom: "12px" }}>
                  <strong>{room.name}</strong>
                  <button
                    onClick={() => handleViewRoom(room._id)}
                    style={{
                      marginLeft: "8px",
                      padding: "6px 12px",
                      background: "#1976d2",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    View Room
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
