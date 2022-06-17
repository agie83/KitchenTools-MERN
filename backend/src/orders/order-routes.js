import express from 'express';
import OrderController from './order-controller';

const router = express.Router();

router.get('/orders/', OrderController.get);
router.patch('/orders', OrderController.updateMany);

export default router;
