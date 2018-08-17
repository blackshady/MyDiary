import {
  Router,
} from 'express';
import UsersController from '../controllers/UsersController';
import Authorization from '../middlewares/Authorization';
import asyncCatchErrors from '../helpers/asyncErrorHandler';

const router = Router();

router.put(
  '/users/upload', Authorization.verifyToken, asyncCatchErrors(UsersController.uploadImage),
);

router.get(
  '/users/info', Authorization.verifyToken, asyncCatchErrors(UsersController.getDetails),
);

export default router;
