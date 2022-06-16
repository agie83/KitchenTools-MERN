import express from 'express';
import ShopController from './shop-controller';

const router = express.Router();

router.get('/shop', ShopController.getCategories);
router.get('/shop/:slug', ShopController.getCategoryProducts);
router.get('/shop/:slug/:productSlug', ShopController.getProduct);

export default router;
