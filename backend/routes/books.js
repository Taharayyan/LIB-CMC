import { Router } from 'express';
import { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
} from '../controllers/bookController.js';
import { authenticateToken, optionalAuth } from '../middleware/authMiddleware.js';
import { requireUserOrAdmin } from '../middleware/roleMiddleware.js';
import { validateRequest, bookSchema } from '../middleware/validationMiddleware.js';
import { uploadBook } from '../middleware/uploadMiddleware.js';

const router = Router();

router.get('/', optionalAuth, getAllBooks);
router.get('/:id', optionalAuth, getBookById);
router.post('/', authenticateToken, requireUserOrAdmin, uploadBook, validateRequest(bookSchema), createBook);
router.put('/:id', authenticateToken, requireUserOrAdmin, validateRequest(bookSchema), updateBook);
router.delete('/:id', authenticateToken, requireUserOrAdmin, deleteBook);

export default router;
