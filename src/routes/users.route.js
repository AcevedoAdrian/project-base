import { Router } from 'express';
import { registerUser } from '../controllers/users.controller.js';
const router = Router();

router.get('/register', registerUser);

export default router;
