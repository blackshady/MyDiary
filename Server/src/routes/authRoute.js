import {
  Router,
} from 'express';
import AuthController from '../controllers/AuthController';
import asyncCatchErrors from '../helpers/asyncErrorHandler';
import AuthValidator from '../middlewares/AuthValidator';
import Authorization from '../middlewares/Authorization';


const router = Router();

// Users routes
router.post('/login', AuthValidator.validateLogin, asyncCatchErrors(AuthController.login));
router.post('/signup', AuthValidator.validateSignup, asyncCatchErrors(AuthController.signUp));
router.post('/reset_password_request', asyncCatchErrors(AuthController.resetPasswordRequest));
router.post('/reset_password', asyncCatchErrors(AuthController.resetPassword));

export default router;
