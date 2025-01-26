import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import recentChatRoutes from "./routes/recentChatRoutes.js";
import authRoutes from './routes/authRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',  // Allow frontend running on localhost:5173
    methods: ['GET', 'POST'],
  },
});
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


    app.use('/api/auth', authRoutes);
    app.use('/api/groups', groupRoutes);
    app.use('/api/messages', messageRoutes);
    app.use('/api/users', userRoutes);
    app.use("/api/recent-chats", recentChatRoutes);

    
    io.on('connection', (socket) => {
      console.log('New user connected');
    
      // Join a room
      socket.on('joinRoom', (room, username) => {
        socket.join(room);
        io.to(room).emit('message', { content: `${username} joined the room` });
      });
    
      // Send message (text or image)
      socket.on('chatMessage', async (message, room, username, recipientId = null) => {
        let newMessage;
        if (message.startsWith('image:')) {
          const imageUrl = await uploadImage(message.slice(6)); // Assuming it's base64 or file path
          newMessage = new Message({ content: imageUrl, sender: username, room, recipient: recipientId });
        } else {
          newMessage = new Message({ content: message, sender: username, room, recipient: recipientId });
        }
    
        await newMessage.save();
        if (recipientId) {
          socket.to(recipientId).emit('privateMessage', { content: message, sender: username });
        } else {
          io.to(room).emit('message', { content: message, sender: username });
        }
      });
    
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
    
    // Start server
    server.listen(5000, () => {
      console.log('Server is running on port 5000');
    });