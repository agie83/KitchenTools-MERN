import express from 'express';
import StoreController from './store-controller';

const router = express.Router();

router.get('/stores', StoreController.get);

export default router;
