import {
  Router,
} from 'express';

const router = Router();

router.get('/entries', (req, res) => res.send('hello'));

export default router;
