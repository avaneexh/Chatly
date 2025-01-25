import express from 'express';
import {
  sendMessage,
  getMessages,
} from '../controllers/message.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Send a message
router.post('/send', authMiddleware, sendMessage);

// Get messages for a specific room
router.get('/:roomId', authMiddleware, getMessages);

export default router;
