const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fs = require('fs');
fs.writeFileSync('server_running.txt', `Server started at ${new Date().toISOString()}\n`);
const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'quest-academy-secret-key';

app.use(cors());
app.use(express.json());

// In-memory mock database
const users = [];

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', engine: 'CommonJS Mock' });
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'All fields required' });
    
    if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, username, email, password_hash: hashedPassword };
    users.push(user);

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(201).json({ token, user: { id: user.id, username, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Wrong password' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json({ user: { id: user.id, username: user.username, email: user.email } });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MOCK SERVER RUNNING ON ${PORT}`);
});
