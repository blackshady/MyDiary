import { Router } from 'express';
import entriesController from '../controllers/dummy-controllers/entriesController';

const router = Router();

router.get('/entries', entriesController.getAllEntries);

export default router;
