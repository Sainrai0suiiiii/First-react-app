// Import sequelize-mock
const SequelizeMock = require('sequelize-mock');

// Create a mock Sequelize instance
const dbMock = new SequelizeMock();

// Define a mocked Product model
const ProductMock = dbMock.define('Product', {
  id: 1,
  productName: 'Test Product',
  price: 99.99,
  description: 'This is a test product',
  productImage: 'test.jpg'
});

// Test suite for Product Model
describe('Product Model', () => {
  it('should create a product', async () => {
    const product = await ProductMock.create({
      productName: 'New Product',
      price: 49.99,
      description: 'A new test product',
      productImage: 'new.jpg'
    });

    expect(product.productName).toBe('New Product');
    expect(product.price).toBe(49.99);
    expect(product.description).toBe('A new test product');
    expect(product.productImage).toBe('new.jpg');
  });

  // Note: sequelize-mock does not enforce required fields by default.
  // This test will pass unless you add custom validation logic.
  it('should allow creating a product with missing fields (mock limitation)', async () => {
    const product = await ProductMock.create({});
    expect(product.productName).toBeUndefined();
    expect(product.price).toBeUndefined();
  });
});