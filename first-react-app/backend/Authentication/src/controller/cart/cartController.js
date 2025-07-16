import { Cart, Product } from '../../models/index.js';

/**
 * Get user's cart with product details
 */
const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id; // From JWT token
        
        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'image', 'stock']
            }]
        });
        
        // Calculate total
        let total = 0;
        const cartWithTotal = cartItems.map(item => {
            const itemTotal = item.quantity * item.Product.price;
            total += itemTotal;
            return {
                ...item.toJSON(),
                itemTotal
            };
        });
        
        res.status(200).json({
            success: true,
            data: {
                items: cartWithTotal,
                total: total
            },
            message: "Cart fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch cart'
        });
    }
};

/**
 * Add item to cart
 */
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;
        
        // Validation
        if (!productId) {
            return res.status(400).json({
                success: false,
                error: 'Product ID is required'
            });
        }
        
        // Check if product exists and has stock
        const product = await Product.findOne({
            where: { id: productId, isActive: true }
        });
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                error: 'Insufficient stock'
            });
        }
        
        // Check if item already exists in cart
        const existingCartItem = await Cart.findOne({
            where: { userId, productId }
        });
        
        if (existingCartItem) {
            // Update quantity
            const newQuantity = existingCartItem.quantity + quantity;
            if (newQuantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    error: 'Insufficient stock'
                });
            }
            
            await existingCartItem.update({ quantity: newQuantity });
            
            res.status(200).json({
                success: true,
                data: existingCartItem,
                message: "Cart updated successfully"
            });
        } else {
            // Add new item
            const cartItem = await Cart.create({
                userId,
                productId,
                quantity
            });
            
            res.status(201).json({
                success: true,
                data: cartItem,
                message: "Item added to cart successfully"
            });
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add item to cart'
        });
    }
};

/**
 * Update cart item quantity
 */
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { quantity } = req.body;
        
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                error: 'Valid quantity is required'
            });
        }
        
        const cartItem = await Cart.findOne({
            where: { id, userId },
            include: [{
                model: Product,
                attributes: ['stock']
            }]
        });
        
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                error: 'Cart item not found'
            });
        }
        
        if (quantity > cartItem.Product.stock) {
            return res.status(400).json({
                success: false,
                error: 'Insufficient stock'
            });
        }
        
        await cartItem.update({ quantity });
        
        res.status(200).json({
            success: true,
            data: cartItem,
            message: "Cart item updated successfully"
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update cart item'
        });
    }
};

/**
 * Remove item from cart
 */
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        
        const cartItem = await Cart.findOne({
            where: { id, userId }
        });
        
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                error: 'Cart item not found'
            });
        }
        
        await cartItem.destroy();
        
        res.status(200).json({
            success: true,
            message: "Item removed from cart successfully"
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to remove item from cart'
        });
    }
};

/**
 * Clear user's cart
 */
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        
        await Cart.destroy({
            where: { userId }
        });
        
        res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to clear cart'
        });
    }
};

export const cartController = {
    getUserCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
}; 