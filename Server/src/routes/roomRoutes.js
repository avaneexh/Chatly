import express from 'express';
import {
  createRoom,
  getRooms,
  getRoom,
  addMember,
} from '../controllers/room.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new room
router.post('/create', authMiddleware, createRoom);

// Get all rooms (public and private)
router.get('/', authMiddleware, getRooms);

// Get details of a specific room
router.get('/:roomId', authMiddleware, getRoom);

// Add a member to a private room
router.put('/add-member', authMiddleware, addMember);

export default router;
