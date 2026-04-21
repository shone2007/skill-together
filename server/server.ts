console.log('--- Server starting ---');
import fs from 'fs';
fs.appendFileSync('server.log', `\n[${new Date().toISOString()}] Starting server...\n`);
process.on('uncaughtException', (err) => {
  fs.appendFileSync('server.log', `[FATAL ERROR] ${err.stack}\n`);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  fs.appendFileSync('server.log', `[UNHANDLED REJECTION] ${reason}\n`);
});
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = Number(process.env.SERVER_PORT) || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.get('/', (_req, res) => {
  res.send('Quest Academy API');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏰 Quest Academy API running on http://0.0.0.0:${PORT}`);
  console.log(`   Health check: http://127.0.0.1:${PORT}/api/health`);
});

