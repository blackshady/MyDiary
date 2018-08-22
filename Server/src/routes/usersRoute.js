import {
  Router,
} from 'express';
import multipart from 'connect-multiparty';
import CloudUpload from '../middlewares/utils/CloudUpload';
import UsersController from '../controllers/UsersController';
import Authorization from '../middlewares/Authorization';
import asyncCatchErrors from '../helpers/asyncErrorHandler';

const multipartMiddleware = multipart();
const router = Router();

router.put(
  '/users/upload', Authorization.verifyToken, multipartMiddleware, asyncCatchErrors(CloudUpload.uploadToCloud), asyncCatchErrors(UsersController.uploadImage),
);

router.get(
  '/users/info', Authorization.verifyToken, asyncCatchErrors(UsersController.getDetails),
);

export default router;