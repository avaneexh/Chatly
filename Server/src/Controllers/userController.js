import User from '../models/User.js';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('joinedGroups', 'name description');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      username: user.username,
      email: user.email,
      joinedGroups: user.joinedGroups,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user information
      user.username = username || user.username;
      user.email = email || user.email;
  
      await user.save();
      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  };
  

  import Group from '../models/Group.js';

  // Add user to a group
  export const joinGroup = async (req, res) => {
    const { groupId } = req.body;
    try {
      const user = await User.findById(req.user._id);
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      // Check if user is already in the group
      if (group.members.includes(user._id)) {
        return res.status(400).json({ error: 'User is already in the group' });
      }
  
      group.members.push(user._id);
      user.joinedGroups.push(group._id);
  
      await group.save();
      await user.save();
  
      res.json({ message: 'User successfully joined the group' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to join group' });
    }
  };
  

  // Remove user from a group
export const leaveGroup = async (req, res) => {
    const { groupId } = req.body;
    try {
      const user = await User.findById(req.user._id);
      const group = await Group.findById(groupId);
  
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      // Remove user from group
      group.members.pull(user._id);
      user.joinedGroups.pull(group._id);
  
      await group.save();
      await user.save();
  
      res.json({ message: 'User successfully left the group' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to leave group' });
    }
  };
  