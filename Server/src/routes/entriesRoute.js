import {
  Router,
} from 'express';
import EntriesController from '../controllers/EntriesController';
import Authorization from '../middlewares/Authorization';
import asyncCatchErrors from '../helpers/asyncErrorHandler';
import EntriesValidator from '../middlewares/EntriesValidator';

const router = Router();

// Entries  routes
router.get('/entries', Authorization.verifyToken, asyncCatchErrors(EntriesController.getAllEntries));

router.post('/entries', Authorization.verifyToken, EntriesValidator.validateCreateEntry, asyncCatchErrors(EntriesController.createEntry));

router.get('/entries/:entryId', Authorization.verifyToken, EntriesValidator.validateParams, asyncCatchErrors(EntriesController.getEntry));

router.delete('/entries/:entryId', Authorization.verifyToken, EntriesValidator.validateParams, asyncCatchErrors(EntriesController.deleteDiary));

export default router;
