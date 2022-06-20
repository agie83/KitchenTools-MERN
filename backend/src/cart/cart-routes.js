import express from 'express';
import CartController from './cart-controller';
import verifyUser from '../_middlewares/verify-user';

const router = express.Router();

router.get('/cart/', CartController.get);
router.get('/cart/:userId', verifyUser, CartController.get);
router.patch('/cart/:orderId', CartController.updateQty);
router.post('/cart/:userId', verifyUser, CartController.post);
router.delete('/cart', CartController.deleteMany);

export default router;
