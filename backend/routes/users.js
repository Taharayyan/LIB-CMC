import { Router } from 'express';
import { getProfile, updateProfile, getAllUsers } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireAdmin, requireUserOrAdmin } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.get('/', authenticateToken, requireAdmin, getAllUsers);

export default router;
