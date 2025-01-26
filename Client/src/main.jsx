import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { GroupProvider } from "./context/GroupContext";
import { SocketProvider } from "./context/SocketContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GroupProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </GroupProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
