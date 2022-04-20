import { Router } from 'express';
import { dragons } from './dragon';

export const router = Router();

router.use('/api/v1', dragons);
