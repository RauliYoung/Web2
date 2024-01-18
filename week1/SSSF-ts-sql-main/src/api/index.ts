import express from 'express';

import categoryRoute from './routes/categoryRoute';
import {MessageResponse} from '../types/MessageTypes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'animals api v1',
  });
});

router.use('/categories', categoryRoute);

export default router;
