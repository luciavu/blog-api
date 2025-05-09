import { Router } from 'express';
import { getPosts, getPostById } from '../controllers/posts.controller';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);

export default router;
