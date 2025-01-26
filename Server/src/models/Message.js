import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', 
    required: true 
  }, // Links the message to a specific room

  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Links the message to the user who sent it

  text: { 
    type: String, 
    default: '', // Optional: For messages without text, e.g., image-only messages
  }, 

  image: { 
    type: String, 
    default: '', // Optional: URL for an image attached to the message
  },

  timestamp: { 
    type: Date, 
    default: Date.now, 
  }, // When the message was sent
});

export default mongoose.model('Message', messageSchema);
