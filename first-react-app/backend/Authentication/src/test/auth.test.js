const request = require('supertest');
const app = require('../src/index'); // Express app
const { User } = require('../models');

describe('Authentication Endpoints', () => {
  beforeAll(async () => {
    await User.destroy({ where: {} });
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'freshbuyer',
      email: 'buyer@valleyfresh.com',
      password: 'fresh123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login and return a JWT token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'buyer@valleyfresh.com',
      password: 'fresh123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});