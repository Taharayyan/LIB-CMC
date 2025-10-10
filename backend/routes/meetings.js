import { Router } from 'express';
import { 
  getAllMeetings, 
  getMeetingById, 
  createMeeting, 
  updateMeeting, 
  deleteMeeting 
} from '../controllers/meetingController.js';
import { authenticateToken, optionalAuth } from '../middleware/authMiddleware.js';
import { requireUserOrAdmin } from '../middleware/roleMiddleware.js';
import { validateRequest, meetingSchema } from '../middleware/validationMiddleware.js';

const router = Router();

router.get('/', optionalAuth, getAllMeetings);
router.get('/:id', optionalAuth, getMeetingById);
router.post('/', authenticateToken, requireUserOrAdmin, validateRequest(meetingSchema), createMeeting);
router.put('/:id', authenticateToken, requireUserOrAdmin, validateRequest(meetingSchema), updateMeeting);
router.delete('/:id', authenticateToken, requireUserOrAdmin, deleteMeeting);

export default router;
