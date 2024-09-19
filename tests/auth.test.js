const request = require('supertest');
const app = require('../app');

describe('Auth Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ name: 'John', surname: 'Doe', email: 'john@example.com', password: '123456' });
    expect(res.statusCode).toEqual(201);
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com', password: '123456' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
