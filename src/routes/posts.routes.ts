import { Router } from 'express';
import {
  getPosts,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.controller';
import { verifyToken, isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getPosts);
router.get('/all', verifyToken, isAdmin, getAllPosts);
router.get('/:id', getPostById);
router.post('/', verifyToken, isAdmin, createPost);
router.put('/:id', verifyToken, isAdmin, updatePost);
router.delete('/:id', verifyToken, isAdmin, deletePost);

export default router;
