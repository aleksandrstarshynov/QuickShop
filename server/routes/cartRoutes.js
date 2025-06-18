import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

router.post('/cart', cartController.addToCart);
router.get('/cart/:userId', cartController.getCart);
router.put('/cart', cartController.updateCartItem);
router.delete('/cart/:userId/:productId', cartController.deleteCartItem);

export default router;