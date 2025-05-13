import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateSignup } from '../middleware/validation.middleware';

const router = Router();

router.post('/register', validateSignup, register);
router.post('/login', login);

export default router;
