import { Router } from 'express';
import EntriesController from '../controllers/dummy-controllers/entriesController';

const router = Router();

router.get('/entries', EntriesController.getAllEntries);
router.get('/entries/:entryId', EntriesController.getEntry);
router.post('/entries', EntriesController.createEntry);

export default router;
