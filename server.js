import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from './server/models/User.js';
import ExchangeRequest from './server/models/ExchangeRequest.js';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'quest-academy-123';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/quest_academy';

app.use(cors());
app.use(express.json());

import { MongoMemoryServer } from 'mongodb-memory-server';

// Connect to MongoDB
try {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log('🟢 MongoDB connected successfully (In-Memory)');
} catch (err) {
  console.error('🔴 MongoDB connection error:', err);
}

// Auth Middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ status: 'ok', db: dbStatus, usersCount });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Signup
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ error: 'Email already exists' });

    const password_hash = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password_hash });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    res.status(201).json({ token, user: { id: newUser._id, username, email, skillsToTeach: [], skillsToLearn: [] } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isValid = bcrypt.compareSync(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, skillsToTeach: user.skillsToTeach, skillsToLearn: user.skillsToLearn } });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// Get Current User
app.get('/api/auth/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { id: user._id, username: user.username, email: user.email, skillsToTeach: user.skillsToTeach, skillsToLearn: user.skillsToLearn } });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Profile (Skills)
app.put('/api/auth/profile', authenticate, async (req, res) => {
  try {
    const { skillsToTeach, skillsToLearn } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (skillsToTeach !== undefined) user.skillsToTeach = skillsToTeach;
    if (skillsToLearn !== undefined) user.skillsToLearn = skillsToLearn;
    await user.save();

    res.json({ user: { id: user._id, username: user.username, email: user.email, skillsToTeach: user.skillsToTeach, skillsToLearn: user.skillsToLearn } });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Marketplace Users (People who can teach)
app.get('/api/users/marketplace', authenticate, async (req, res) => {
  try {
    // Return users who have at least one skill to teach (excluding self)
    const users = await User.find({
      _id: { $ne: req.userId },
      $expr: { $gt: [{ $size: "$skillsToTeach" }, 0] }
    }).select('username email skillsToTeach skillsToLearn');

    res.json(users);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Exchange Request
app.post('/api/exchanges/request', authenticate, async (req, res) => {
  try {
    const { receiverId, skillOffered, skillRequested } = req.body;
    if (!receiverId || !skillOffered || !skillRequested) return res.status(400).json({ error: 'Missing fields' });

    const newRequest = new ExchangeRequest({
      senderId: req.userId,
      receiverId,
      skillOffered,
      skillRequested
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get My Exchange Requests
app.get('/api/exchanges', authenticate, async (req, res) => {
  try {
    const requests = await ExchangeRequest.find({
      $or: [{ senderId: req.userId }, { receiverId: req.userId }]
    }).populate('senderId', 'username email').populate('receiverId', 'username email');
    res.json(requests);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Accept/Reject Exchange Request
app.put('/api/exchanges/:id', authenticate, async (req, res) => {
  try {
    const { status } = req.body; // 'accepted' or 'rejected'
    const request = await ExchangeRequest.findById(req.params.id);

    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.receiverId.toString() !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    request.status = status;
    await request.save();
    res.json(request);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🏰 MERN BACKEND IS READY!`);
  console.log(`   - Server port: ${PORT}\n`);
});
