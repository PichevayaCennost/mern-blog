import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/check.js';

const router = new Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', checkAuth, getMe);



export default router; 