import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // Initialize the socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket'], // Use WebSocket transport
    });
    setSocket(newSocket);

    // Clean up the socket connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
