import {
  Router,
} from 'express';
import EntriesController from '../controllers/EntriesController';
import Authorization from '../middlewares/Authorization';
import asyncCatchErrors from '../helpers/asyncErrorHandler';
import EntriesValidator from '../middlewares/EntriesValidator';

const router = Router();

const authPost = [
  Authorization.verifyToken,
  EntriesValidator.validateCreateEntry,
];
const authValidate = [Authorization.verifyToken, EntriesValidator.validateParams];

// Entries  routes
router.get(
  '/entries',
  Authorization.verifyToken,
  asyncCatchErrors(EntriesController.getAllEntries),
);

router.post(
  '/entries',
  ...authPost,
  asyncCatchErrors(EntriesController.createEntry),
);

router.get(
  '/entries/:entryId',
  ...authValidate,
  asyncCatchErrors(EntriesController.getEntry),
);

router.put(
  '/entries/:entryId',
  ...authValidate, EntriesValidator.validateModifyEntry, asyncCatchErrors(EntriesController.updateDiary),
);

router.delete(
  '/entries/:entryId',
  ...authValidate,
  asyncCatchErrors(EntriesController.deleteDiary),
);

export default router;
