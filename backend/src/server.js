import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import noteRoutes from './routes/note.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Notes API running',
    endpoints: {
      list: 'GET    /notes',
      create: 'POST   /notes',
      delete: 'DELETE /notes/:id',
    },
  });
});

// Notes routes
app.use('/notes', noteRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Start server after DB connects
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✓ Notes backend running on http://localhost:${PORT}`);
  });
};
start();
