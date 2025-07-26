import { Op } from 'sequelize';
import { sequelize } from '../../database/index.js';
import { Product } from '../../models/index.js';
import { logError, logInfo } from '../../utils/logger.js';

/**
 * Get all products with pagination, search, and filtering
 */
const getAllProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            category,
            brand,
            minPrice,
            maxPrice,
            inStock,
            isFeatured,
            sortBy = 'createdAt',
            sortOrder = 'DESC'
        } = req.query;

        // Build where clause
        const whereClause = { isActive: true };
        
        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } },
                { brand: { [Op.iLike]: `%${search}%` } }
            ];
        }
        
        if (category) {
            whereClause.category = category;
        }
        
        if (brand) {
            whereClause.brand = brand;
        }
        
        if (minPrice || maxPrice) {
            whereClause.price = {};
            if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
        }
        
        if (inStock !== undefined) {
            whereClause.inStock = inStock === 'true';
        }
        
        if (isFeatured !== undefined) {
            whereClause.isFeatured = isFeatured === 'true';
        }

        // Calculate pagination
        const offset = (parseInt(page) - 1) * parseInt(limit);
        
        // Validate sort parameters
        const allowedSortFields = ['name', 'price', 'rating', 'createdAt', 'viewCount', 'soldCount'];
        const allowedSortOrders = ['ASC', 'DESC'];
        
        const finalSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const finalSortOrder = allowedSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';

        const { count, rows: products } = await Product.findAndCountAll({
            where: whereClause,
            order: [[finalSortBy, finalSortOrder]],
            limit: parseInt(limit),
            offset: offset
        });

        const totalPages = Math.ceil(count / parseInt(limit));
        const hasNextPage = parseInt(page) < totalPages;
        const hasPrevPage = parseInt(page) > 1;

        logInfo('Products fetched successfully', { 
            count, 
            page: parseInt(page), 
            limit: parseInt(limit),
            filters: { search, category, brand, minPrice, maxPrice, inStock, isFeatured }
        });

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems: count,
                itemsPerPage: parseInt(limit),
                hasNextPage,
                hasPrevPage
            },
            message: "Products fetched successfully"
        });
    } catch (error) {
        logError('Error fetching products', error);
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
        
        // Increment view count
        await product.increment('viewCount');
        
        logInfo('Product fetched successfully', { productId: id });
        
        res.status(200).json({
            success: true,
            data: product,
            message: "Product fetched successfully"
        });
    } catch (error) {
        logError('Error fetching product', error, { productId: req.params.id });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch product'
        });
    }
};

/**
 * Get product by slug
 */
const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        
        const product = await Product.findOne({
            where: { slug, isActive: true }
        });
        
        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }
        
        // Increment view count
        await product.increment('viewCount');
        
        logInfo('Product fetched by slug successfully', { slug });
        
        res.status(200).json({
            success: true,
            data: product,
            message: "Product fetched successfully"
        });
    } catch (error) {
        logError('Error fetching product by slug', error, { slug: req.params.slug });
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
        const { 
            name, 
            description, 
            shortDescription,
            price, 
            originalPrice,
            stock, 
            category,
            subcategory,
            brand,
            sku,
            weight,
            dimensions,
            tags,
            isFeatured
        } = req.body;
        
        // Handle image upload
        let imageFilename = null;
        let images = null;
        
        if (req.file) {
            imageFilename = req.file.filename;
        }
        
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.filename);
        }
        
        const product = await Product.create({
            name,
            description,
            shortDescription,
            price: parseFloat(price),
            originalPrice: originalPrice ? parseFloat(originalPrice) : null,
            stock: parseInt(stock) || 0,
            category,
            subcategory,
            brand,
            sku,
            weight: weight ? parseFloat(weight) : null,
            dimensions: dimensions ? JSON.parse(dimensions) : null,
            image: imageFilename,
            images,
            tags: tags ? JSON.parse(tags) : null,
            isFeatured: isFeatured === 'true'
        });
        
        logInfo('Product created successfully', { productId: product.id, name: product.name });
        
        res.status(201).json({
            success: true,
            data: product,
            message: "Product created successfully"
        });
    } catch (error) {
        logError('Error creating product', error);
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
        
        // Handle image upload
        if (req.file) {
            updateData.image = req.file.filename;
        }
        
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => file.filename);
        }
        
        // Parse numeric fields
        if (updateData.price) updateData.price = parseFloat(updateData.price);
        if (updateData.originalPrice) updateData.originalPrice = parseFloat(updateData.originalPrice);
        if (updateData.stock) updateData.stock = parseInt(updateData.stock);
        if (updateData.weight) updateData.weight = parseFloat(updateData.weight);
        
        // Parse JSON fields
        if (updateData.dimensions) updateData.dimensions = JSON.parse(updateData.dimensions);
        if (updateData.tags) updateData.tags = JSON.parse(updateData.tags);
        
        await product.update(updateData);
        
        logInfo('Product updated successfully', { productId: id });
        
        res.status(200).json({
            success: true,
            data: product,
            message: "Product updated successfully"
        });
    } catch (error) {
        logError('Error updating product', error, { productId: req.params.id });
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
        
        logInfo('Product deleted successfully', { productId: id });
        
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        logError('Error deleting product', error, { productId: req.params.id });
        res.status(500).json({
            success: false,
            error: 'Failed to delete product'
        });
    }
};

/**
 * Get products by category
 */
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const offset = (parseInt(page) - 1) * parseInt(limit);
        
        const { count, rows: products } = await Product.findAndCountAll({
            where: {
                category: category,
                isActive: true
            },
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: offset
        });
        
        const totalPages = Math.ceil(count / parseInt(limit));
        
        logInfo('Products fetched by category successfully', { category, count });
        
        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems: count,
                itemsPerPage: parseInt(limit)
            },
            message: "Products fetched successfully"
        });
    } catch (error) {
        logError('Error fetching products by category', error, { category: req.params.category });
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products'
        });
    }
};

/**
 * Get featured products
 */
const getFeaturedProducts = async (req, res) => {
    try {
        const { limit = 8 } = req.query;
        
        let products = await Product.findAll({
            where: {
                isFeatured: true,
                isActive: true,
                inStock: true
            },
            order: [['rating', 'DESC'], ['viewCount', 'DESC']],
            limit: parseInt(limit)
        });

        // If no featured products, get the most recent ones
        if (products.length === 0) {
            products = await Product.findAll({
                where: {
                    isActive: true,
                    inStock: true
                },
                order: [['createdAt', 'DESC']],
                limit: parseInt(limit)
            });
        }
        
        logInfo('Featured products fetched successfully', { count: products.length });
        
        res.status(200).json({
            success: true,
            data: products,
            message: "Featured products fetched successfully"
        });
    } catch (error) {
        logError('Error fetching featured products', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch featured products'
        });
    }
};

/**
 * Get product categories
 */
const getProductCategories = async (req, res) => {
    try {
        const categories = await Product.findAll({
            attributes: [
                'category',
                [sequelize.fn('COUNT', sequelize.col('id')), 'productCount']
            ],
            where: { isActive: true },
            group: ['category'],
            order: [['category', 'ASC']]
        });
        
        logInfo('Product categories fetched successfully');
        
        res.status(200).json({
            success: true,
            data: categories,
            message: "Categories fetched successfully"
        });
    } catch (error) {
        logError('Error fetching product categories', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch categories'
        });
    }
};

export const productController = {
    getAllProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getFeaturedProducts,
    getProductCategories
}; 