import express from 'express';
import { productController } from '../../controller/product/productController.js';
import upload from '../../middleware/multerConfig.js';
import { authenticateToken } from '../../middleware/token-middleware.js';
import {
    validateProductCreation,
    validateProductUpdate
} from '../../middleware/validation.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/categories', productController.getProductCategories);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/slug/:slug', productController.getProductBySlug);
router.get('/:id', productController.getProductById);

// Admin routes (authentication required)
router.post('/', 
  authenticateToken, 
  upload.single('image'), 
  validateProductCreation, 
  productController.createProduct
);

router.put('/:id', 
  authenticateToken, 
  upload.single('image'), 
  validateProductUpdate, 
  productController.updateProduct
);

router.delete('/:id', 
  authenticateToken, 
  productController.deleteProduct
);

export default router; 