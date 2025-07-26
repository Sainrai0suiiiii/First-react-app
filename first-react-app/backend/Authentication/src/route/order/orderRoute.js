import express from 'express';
import { orderController } from '../../controller/order/orderController.js';

const router = express.Router();

// Default route to fetch all orders
router.get('/', orderController.getAllOrders); // ✅ Added

// User routes (require authentication)
router.post('/', orderController.createOrder);
router.get('/user', orderController.getUserOrders);
router.get('/user/:id', orderController.getOrderById);

// Admin routes
router.get('/', orderController.getAllOrders); // optional, now duplicate
router.put('/:id/status', orderController.updateOrderStatus);

export default router;
