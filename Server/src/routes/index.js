import {
  Router,
} from 'express';
import path from 'path';
import entriesRoute from './entriesRoute';
import authRoute from './authRoute';

const router = Router();

// index route
router.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));

router.use('/api/v1', entriesRoute);
router.use('/api/v1/auth', authRoute);

// catch all route
router.all('/*', (req, res) => res.status(404).json({
  status: 'error',
  message: 'Page Not Found',
}));

export default router;
