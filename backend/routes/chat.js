import { Router } from 'express';
import { 
  getChatMessages, 
  createChatMessage, 
  deleteChatMessage 
} from '../controllers/chatController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireUserOrAdmin } from '../middleware/roleMiddleware.js';
import { validateRequest, chatMessageSchema } from '../middleware/validationMiddleware.js';

const router = Router();

router.get('/:meetingId', authenticateToken, requireUserOrAdmin, getChatMessages);
router.post('/:meetingId', authenticateToken, requireUserOrAdmin, validateRequest(chatMessageSchema), createChatMessage);
router.delete('/:messageId', authenticateToken, requireUserOrAdmin, deleteChatMessage);

export default router;
