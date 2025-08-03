// Import product controller and mocked model
const productController = require('../controller/productController');
const Product = require('../models/product');

// Mock Sequelize methods
jest.mock('../models/product', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

// Helper to mock Express res object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// -------------------- TEST CASES --------------------

describe('Product Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test: Creating a product
  test('should create a product', async () => {
    const req = {
      body: {
        productName: 'Test Product',
        price: 49.99,
        description: 'A test product',
        productImage: 'test.jpg'
      }
    };
    const res = mockResponse();

    Product.create.mockResolvedValue(req.body);

    await productController.createProduct(req, res);

    expect(Product.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Product created successfully',
      data: req.body
    });
  });

  // Test: Getting all products
  test('should get all products', async () => {
    const req = {};
    const res = mockResponse();

    const mockProducts = [
      { productName: 'Product 1', price: 10 },
      { productName: 'Product 2', price: 20 }
    ];

    Product.findAll.mockResolvedValue(mockProducts);

    await productController.getAllProducts(req, res);

    expect(Product.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockProducts });
  });

});