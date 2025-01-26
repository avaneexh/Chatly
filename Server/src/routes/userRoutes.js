import express from 'express';
import { getUserProfile, updateUserProfile, joinGroup, leaveGroup } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Update user profile
router.put('/profile', authMiddleware, updateUserProfile);

// Join a group
router.post('/join-group', authMiddleware, joinGroup);

// Leave a group
router.post('/leave-group', authMiddleware, leaveGroup);

export default router;
