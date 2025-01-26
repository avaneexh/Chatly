import express from 'express';
import { sendMessage, getMessages } from '../Controllers/messageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Send a message (text or image)
router.post('/send', authMiddleware, sendMessage);

// Get messages for a specific group or user-to-user chat
router.get('/get', authMiddleware, getMessages);

export default router;
