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
router.get('/posts/:postId/comments', getComments);
router.get('/posts/:postId/comments/:id', getCommentById);

// Logged-in only
router.post('/posts/:postId/comments', verifyToken, createComment);

// Admin only
router.delete('/posts/:postId/comments/:id', verifyToken, isAdmin, deleteComment);

export default router;
