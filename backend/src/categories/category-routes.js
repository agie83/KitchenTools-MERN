import express from 'express';
import { categoryController } from './category-controller';

const router = express.Router();

router.get('/categories', categoryController.get);

export default router;
