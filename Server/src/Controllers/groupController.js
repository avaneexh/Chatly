import Group from '../models/Group.js';
import User from '../models/User.js';

// Create a group
export const createGroup = async (req, res) => {
  const { name, description, isPrivate } = req.body;
  const group = new Group({ name, description, isPrivate, members: [req.user._id], admins: [req.user._id] });
  await group.save();
  res.status(201).json(group);
};

// Join a group
export const joinGroup = async (req, res) => {
  const { groupId } = req.body;
  const group = await Group.findById(groupId);
  if (group.isPrivate) return res.status(403).json({ error: 'Private group' });

  group.members.push(req.user._id);
  await group.save();
  res.json(group);
};
