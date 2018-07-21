import { Router } from 'express';
import AuthController from '../controllers/dummy-controllers/authController';

const router = Router();

// Users routes

router.post('/login', AuthController.login);

export default router;
