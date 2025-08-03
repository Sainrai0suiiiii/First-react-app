const request = require('supertest');
const express = require('express');

// Import your product routes and controller
const productRoutes = require('../route/productRoutes');
const Product = require('../models/product');

// Mock Sequelize methods
jest.mock('../models/product', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

// Set up Express app for testing
const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

describe('Product Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/products - should create a product', async () => {
    const newProduct = {
      productName: 'Test Product',
      price: 49.99,
      description: 'A test product',
      productImage: 'test.jpg'
    };
    Product.create.mockResolvedValue(newProduct);

    const res = await request(app)
      .post('/api/products')
      .send(newProduct);

    expect(Product.create).toHaveBeenCalledWith(newProduct);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      message: 'Product created successfully',
      data: newProduct
    });
  });

  test('GET /api/products - should return all products', async () => {
    const mockProducts = [
      { productName: 'Product 1', price: 10 },
      { productName: 'Product 2', price: 20 }
    ];
    Product.findAll.mockResolvedValue(mockProducts);

    const res = await request(app).get('/api/products');

    expect(Product.findAll).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ data: mockProducts });
  });
});