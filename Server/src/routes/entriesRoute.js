import {
  Router,
} from 'express';
import EntriesController from '../controllers/EntriesController';
import Authorization from '../middlewares/Authorization';

const router = Router();

// Entries  routes
router.get('/entries', Authorization.verifyToken, EntriesController.getAllEntries);
router.get('/entries/:entryId', EntriesController.getEntry);
router.post('/entries', EntriesController.createEntry);
router.put('/entries/:entryId', EntriesController.updateEntry);
router.delete('/entries/:entryId', EntriesController.deleteEntry);

export default router;
