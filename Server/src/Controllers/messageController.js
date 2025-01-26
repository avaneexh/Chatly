import Message from '../models/Message.js';
import { uploadImage } from '../utils/cloudinary.js';
import { updateRecentChat } from './recentChatController.js'; // Import recent chat update logic

// Send message (text or image)
export const sendMessage = async (req, res) => {
  const { content, groupId, recipientId } = req.body;
  const senderId = req.user._id;

  try {
    let newMessage;
    if (content.startsWith('image:')) {
      const imageUrl = await uploadImage(content.slice(6)); // Extract image path (base64 or URL)
      newMessage = new Message({ content: imageUrl, sender: senderId, group: groupId, recipient: recipientId });
    } else {
      newMessage = new Message({ content, sender: senderId, group: groupId, recipient: recipientId });
    }

    // Save the message in the database
    await newMessage.save();

    const chatType = groupId ? 'Group' : 'User';
    const chatWith = groupId || recipientId;

    // Update recent chats for the sender
    await updateRecentChat(senderId, chatWith, chatType, content);

    // Update recent chats for the recipient if it's a private message
    if (!groupId && recipientId) {
      await updateRecentChat(recipientId, senderId, 'User', content);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Failed to send message." });
  }
};

// Get messages for group or private chat
export const getMessages = async (req, res) => {
  const { groupId, userId } = req.query;

  try {
    const messages = userId
      ? // Fetch private chat messages between two users
        await Message.find({
          $or: [
            { sender: userId, recipient: req.user._id },
            { sender: req.user._id, recipient: userId },
          ],
        }).populate('sender', 'username')
      : // Fetch messages for a group
        await Message.find({ group: groupId }).populate('sender', 'username');

    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};
