import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload profile picture to Cloudinary (if provided)
    let profilePictureUrl = '';
    if (profilePicture) {
      const result = await cloudinary.uploader.upload(profilePicture, {
        folder: 'profile_pictures',
      });
      profilePictureUrl = result.secure_url;
    }

    // Create the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePictureUrl,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user.' });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in user.' });
  }
};

// Update profile picture
export const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profilePicture } = req.body;

    const result = await cloudinary.uploader.upload(profilePicture, {
      folder: 'profile_pictures',
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: result.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile picture.' });
  }
};
