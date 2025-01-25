import Message from '../models/message.model.js';
import cloudinary from '../config/cloudinary.js';

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { roomId, sender, text, image } = req.body;

    let imageUrl = '';
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'message_images',
      });
      imageUrl = result.secure_url;
    }

    const message = new Message({
      roomId,
      sender,
      text,
      image: imageUrl,
    });

    await message.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
};

// Fetch messages for a room
export const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ roomId })
      .populate('sender', 'username profilePicture')
      .sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
};
