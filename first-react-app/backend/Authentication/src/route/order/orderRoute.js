import express from 'express';
import { orderController } from '../../controller/order/orderController.js';

const router = express.Router();

// User routes (require authentication)
router.post('/', orderController.createOrder);
router.get('/user', orderController.getUserOrders);
router.get('/user/:id', orderController.getOrderById);

// Admin routes (you can add admin middleware here later)
router.get('/all', orderController.getAllOrders);
router.put('/:id/status', orderController.updateOrderStatus);

export default router; 