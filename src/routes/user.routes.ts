import { Router } from 'express';
import { getUsers, getUserById } from '../controllers/users.controller';
import { isAdmin, verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.get('/', verifyToken, isAdmin, getUsers);
router.get('/:id', verifyToken, isAdmin, getUserById);

export default router;
