import express from 'express';
import { roleCheck } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', roleCheck(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const updates = {
      username: req.body.username,
      email: req.body.email,
      profileImage: req.body.profileImage
    };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
