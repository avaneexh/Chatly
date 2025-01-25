import Room from '../models/room.model.js';
import User from '../models/user.model.js';

// Create a new room
export const createRoom = async (req, res) => {
  try {
    const { name, type, admin, members } = req.body;

    // Check if room name already exists
    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room name already exists.' });
    }

    const room = new Room({
      name,
      type,
      admin,
      members: type === 'private' ? members : [], // Members are only needed for private rooms
    });

    await room.save();

    res.status(201).json({ message: 'Room created successfully.', room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room.' });
  }
};

// Fetch all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms.' });
  }
};

// Fetch a specific room
export const getRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId).populate('members', 'username');
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch room.' });
  }
};

// Add members to a private room
export const addMember = async (req, res) => {
  try {
    const { roomId, memberId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }

    if (room.type !== 'private') {
      return res.status(400).json({ error: 'Members can only be added to private rooms.' });
    }

    room.members.push(memberId);
    await room.save();

    res.status(200).json({ message: 'Member added successfully.', room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member.' });
  }
};
