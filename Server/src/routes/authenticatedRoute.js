import { Router } from 'express';
import AuthController from '../controllers/dummy-controllers/authController';

const router = Router();

// Users routes

router.post('/login', AuthController.login);
router.get('/:userId', AuthController.getNumberOfEntries);


export default router;
