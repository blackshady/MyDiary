import {
  Router,
} from 'express';
import EntriesController from '../controllers/dummy-controllers/entriesController';

const router = Router();

// Entries  routes
router.get('/entries', EntriesController.getAllEntries);
router.get('/entries/:entryId', EntriesController.getEntry);
router.post('/entries', EntriesController.createEntry);
router.put('/entries/:entryId', EntriesController.updateEntry);
router.delete('/entries/:entryId', EntriesController.deleteEntry);

export default router;
