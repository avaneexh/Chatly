import express from 'express';
import {
  registerUser,
  loginUser,
  updateProfilePicture,
} from '../controllers/auth.controller.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Update profile picture
router.put('/profile-picture/:userId', updateProfilePicture);

export default router;
