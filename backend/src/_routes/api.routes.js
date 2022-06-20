import express from 'express';
import cors from 'cors';
import authorizationMiddleware from '../_middlewares/authorization-middleware';
import register from '../register/register-routes';
import login from '../login/login-routes';
import shop from '../shop/shop-routes';
import cart from '../cart/cart-routes';
import orders from '../orders/order-routes';
import user from '../user/user-routes';
import categories from '../categories/category-routes';
import stores from '../stores/store-routes';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.use(register);
router.use(login);
router.use(shop);
router.use(categories);
router.use(authorizationMiddleware);
router.use(cart);
router.use(orders);
router.use(user);
router.use(stores);

export default router;
