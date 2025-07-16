import { Cart, Order, OrderItem, Product, User } from '../../models/index.js';

/**
 * Create order from cart
 */
const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { shippingAddress } = req.body;
        
        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                error: 'Shipping address is required'
            });
        }
        
        // Get user's cart
        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'stock']
            }]
        });
        
        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Cart is empty'
            });
        }
        
        // Calculate total and validate stock
        let totalAmount = 0;
        for (const item of cartItems) {
            if (item.quantity > item.Product.stock) {
                return res.status(400).json({
                    success: false,
                    error: `Insufficient stock for ${item.Product.name}`
                });
            }
            totalAmount += item.quantity * item.Product.price;
        }
        
        // Create order
        const order = await Order.create({
            userId,
            totalAmount,
            shippingAddress,
            status: 'pending',
            paymentStatus: 'pending'
        });
        
        // Create order items and update product stock
        for (const item of cartItems) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.Product.price
            });
            
            // Update product stock
            await Product.update(
                { stock: item.Product.stock - item.quantity },
                { where: { id: item.productId } }
            );
        }
        
        // Clear cart
        await Cart.destroy({ where: { userId } });
        
        res.status(201).json({
            success: true,
            data: order,
            message: "Order created successfully"
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create order'
        });
    }
};

/**
 * Get user's orders
 */
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const orders = await Order.findAll({
            where: { userId },
            include: [{
                model: OrderItem,
                include: [{
                    model: Product,
                    attributes: ['name', 'image']
                }]
            }],
            order: [['orderDate', 'DESC']]
        });
        
        res.status(200).json({
            success: true,
            data: orders,
            message: "Orders fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch orders'
        });
    }
};

/**
 * Get order by ID
 */
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        const order = await Order.findOne({
            where: { id, userId },
            include: [{
                model: OrderItem,
                include: [{
                    model: Product,
                    attributes: ['name', 'image', 'description']
                }]
            }]
        });
        
        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: order,
            message: "Order fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch order'
        });
    }
};

/**
 * Update order status (admin only)
 */
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus } = req.body;
        
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }
        
        const updateData = {};
        if (status) updateData.status = status;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;
        
        await order.update(updateData);
        
        res.status(200).json({
            success: true,
            data: order,
            message: "Order status updated successfully"
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update order status'
        });
    }
};

/**
 * Get all orders (admin only)
 */
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{
                model: User,
                attributes: ['name', 'email']
            }, {
                model: OrderItem,
                include: [{
                    model: Product,
                    attributes: ['name']
                }]
            }],
            order: [['orderDate', 'DESC']]
        });
        
        res.status(200).json({
            success: true,
            data: orders,
            message: "All orders fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch orders'
        });
    }
};

export const orderController = {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders
}; 