import {
  Router,
} from 'express';
import AuthController from '../controllers/AuthController';
import asyncCatchErrors from '../helpers/asyncErrorHandler';

const router = Router();

// Users routes
router.post('/login', asyncCatchErrors(AuthController.login));
router.post('/signup', asyncCatchErrors(AuthController.signUp));
// router.get('/:userId', AuthController.getNumberOfEntries);

export default router;
