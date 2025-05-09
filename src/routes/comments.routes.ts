import { Router } from 'express';
import { getComments, getCommentById } from '../controllers/comments.controller';
const router = Router();

router.get('/posts/:postId/comments', getComments);
router.get('/posts/:postId/comments/:id', getCommentById);

export default router;
