import { Product } from '../../models/index.js';

/**
 * Get all products
 */
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { isActive: true }
        });
        res.status(200).json({ 
            success: true, 
            data: products, 
            message: "Products fetched successfully" 
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch products' 
        });
    }
};

/**
 * Get product by ID
 */
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ 
            where: { id, isActive: true } 
        });
        
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                error: 'Product not found' 
            });
        }
        
        res.status(200).json({ 
            success: true, 
            data: product, 
            message: "Product fetched successfully" 
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch product' 
        });
    }
};

/**
 * Create new product
 */
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category, image } = req.body;
        
        // Validation
        if (!name || !description || !price || !category) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields' 
            });
        }
        
        const product = await Product.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock) || 0,
            category,
            image
        });
        
        res.status(201).json({ 
            success: true, 
            data: product, 
            message: "Product created successfully" 
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to create product' 
        });
    }
};

/**
 * Update product
 */
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                error: 'Product not found' 
            });
        }
        
        await product.update(updateData);
        
        res.status(200).json({ 
            success: true, 
            data: product, 
            message: "Product updated successfully" 
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to update product' 
        });
    }
};

/**
 * Delete product (soft delete)
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                error: 'Product not found' 
            });
        }
        
        await product.update({ isActive: false });
        
        res.status(200).json({ 
            success: true, 
            message: "Product deleted successfully" 
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to delete product' 
        });
    }
};

/**
 * Search products by category
 */
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.findAll({
            where: { 
                category: category,
                isActive: true 
            }
        });
        
        res.status(200).json({ 
            success: true, 
            data: products, 
            message: "Products fetched successfully" 
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch products' 
        });
    }
};

export const productController = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
}; 