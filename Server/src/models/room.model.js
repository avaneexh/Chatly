import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['public', 'private'], // Only 'public' or 'private' allowed
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the admin who created the room (only for private rooms)
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // List of users allowed in the room (only for private rooms)
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Room', roomSchema);
