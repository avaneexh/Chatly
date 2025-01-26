import express from 'express';
import { createGroup, joinGroup } from '../controllers/groupController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new group
router.post('/create', authMiddleware, createGroup);

// Join a group (public group only)
router.post('/join', authMiddleware, joinGroup);

export default router;
