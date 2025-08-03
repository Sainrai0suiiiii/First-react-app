const request = require('supertest');
const app = require('../src/index');
const { User, Order } = require('../models');

let userToken;

describe('Order Creation', () => {
  beforeAll(async () => {
    await User.destroy({ where: {} });
    await Order.destroy({ where: {} });

    await request(app).post('/api/auth/register').send({
      username: 'orderuser',
      email: 'orderuser@valleyfresh.com',
      password: 'orderpass'
    });

    const login = await request(app).post('/api/auth/login').send({
      email: 'orderuser@valleyfresh.com',
      password: 'orderpass'
    });

    userToken = login.body.token;
  });

  it('should create an order for authenticated user', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        items: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 }
        ],
        totalPrice: 100
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Order placed successfully');
  });
});