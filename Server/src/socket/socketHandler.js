import Room from '../models/room.model.js';
import Message from '../models/message.model.js';

const onlineUsers = {}; // Track online users by room

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a specific room
    socket.on('joinRoom', async ({ roomId, username }) => {
      console.log(`${username} is joining room ${roomId}`);
      socket.join(roomId);

      // Add user to the room's online users list
      if (!onlineUsers[roomId]) onlineUsers[roomId] = [];
      onlineUsers[roomId].push({ username, socketId: socket.id });

      // Broadcast the updated list of online users to the room
      io.to(roomId).emit('onlineUsers', onlineUsers[roomId]);

      // Optionally, send the room's chat history to the user
      const messages = await Message.find({ roomId }).populate('sender', 'username profilePicture');
      socket.emit('chatHistory', messages);
    });

    // Listen for chat messages
    socket.on('chatMessage', async ({ roomId, sender, text, image }) => {
      console.log(`Message received in room ${roomId}: ${text}`);

      // Save the message to the database
      const newMessage = new Message({
        roomId,
        sender,
        text,
        image,
      });
      await newMessage.save();

      // Broadcast the new message to all users in the room
      io.to(roomId).emit('message', {
        sender,
        text,
        image,
        timestamp: new Date(),
      });
    });

    // Notify others when a user is typing
    socket.on('typing', ({ roomId, username }) => {
      socket.to(roomId).emit('userTyping', `${username} is typing...`);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);

      // Remove the user from the online users list
      for (const roomId in onlineUsers) {
        onlineUsers[roomId] = onlineUsers[roomId].filter(
          (user) => user.socketId !== socket.id
        );

        // Notify the room about the updated list of online users
        io.to(roomId).emit('onlineUsers', onlineUsers[roomId]);
      }
    });
  });
};

export default setupSocket;
