import {
  Router,
} from 'express';
import UserController from '../controllers/UserController';
import Authorization from '../middlewares/Authorization';
import asyncCatchErrors from '../helpers/asyncErrorHandler';

const router = Router();

router.put(
  '/users', Authorization.verifyToken, asyncCatchErrors(UserController.uploadImage),
);
