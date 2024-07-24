// routes/bookRoutes.js
import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get(
  '/books',
  authenticate,
  authorize(['viewer', 'editor', 'admin']),
  getAllBooks
);
router.get(
  '/books/:id',
  authenticate,
  authorize(['viewer', 'editor', 'admin']),
  getBookById
);
router.post('/books', authenticate, authorize(['editor', 'admin']), createBook);
router.put(
  '/books/:id',
  authenticate,
  authorize(['editor', 'admin']),
  updateBook
);
router.delete(
  '/books/:id',
  authenticate,
  authorize(['editor', 'admin']),
  deleteBook
);

export default router;
