import { Router } from 'express';
import authRoutes from './auth.js';
import bookRoutes from './books.js';
import meetingRoutes from './meetings.js';
import chatRoutes from './chat.js';
import userRoutes from './users.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'CMC Nouacour Library API' });
});

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/meetings', meetingRoutes);
router.use('/chat', chatRoutes);
router.use('/users', userRoutes);

export default router;


