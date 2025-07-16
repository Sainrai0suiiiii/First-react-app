import express from 'express';
import { cartController } from '../../controller/cart/cartController.js';
import { authenticateToken } from '../../middleware/token-middleware.js';

const router = express.Router();

// All cart routes require authentication
router.get('/', authenticateToken, cartController.getUserCart);
router.post('/add', authenticateToken, cartController.addToCart);
router.put('/:id', authenticateToken, cartController.updateCartItem);
router.delete('/:id', authenticateToken, cartController.removeFromCart);
router.delete('/', authenticateToken, cartController.clearCart);

export default router; 