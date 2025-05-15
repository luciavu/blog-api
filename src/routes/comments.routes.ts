import { Router } from 'express';
import {
  getComments,
  getCommentById,
  createComment,
  deleteComment,
} from '../controllers/comments.controller';
import { verifyToken, isAdmin } from '../middleware/auth.middleware';
const router = Router();

// Public Routes
router.get('/:postId/comments', getComments);
router.get('/:postId/comments/:id', getCommentById);

// Logged-in only
router.post('/:postId/comments', verifyToken, createComment);

// Admin only
router.delete('/:postId/comments/:id', verifyToken, isAdmin, deleteComment);

export default router;
