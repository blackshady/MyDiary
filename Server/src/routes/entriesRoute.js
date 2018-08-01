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

router.get('/entries/:entryId', EntriesController.getEntry);

router.post('/entries', Authorization.verifyToken, EntriesValidator.validateCreateEntry, asyncCatchErrors(EntriesController.createEntry));

router.put('/entries/:entryId', EntriesController.updateEntry);
router.delete('/entries/:entryId', EntriesController.deleteEntry);

export default router;