import { Router } from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.controller';
import { verifyToken, isAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Admin only Routes
router.post('/', verifyToken, isAdmin, createPost);
router.put('/:id', verifyToken, isAdmin, updatePost);
router.delete('/:id', verifyToken, isAdmin, deletePost);

export default router;
