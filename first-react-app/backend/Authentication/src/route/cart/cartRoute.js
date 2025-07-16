import express from 'express';
import { cartController } from '../../controller/cart/cartController.js';

const router = express.Router();

// All cart routes require authentication
router.get('/', cartController.getUserCart);
router.post('/add', cartController.addToCart);
router.put('/:id', cartController.updateCartItem);
router.delete('/:id', cartController.removeFromCart);
router.delete('/', cartController.clearCart);

export default router; 