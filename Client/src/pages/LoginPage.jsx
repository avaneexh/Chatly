import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("authToken", response.token); // Save token
      navigate("/"); // Navigate to home page
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ padding: "16px", textAlign: "center" }}>
      <h1>Login to Chat App</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%",
        }}
      />
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
