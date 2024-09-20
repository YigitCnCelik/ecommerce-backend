const request = require('supertest');
const { app, initializeDatabase, shutdown } = require('../app');
const User = require('../models/User');

beforeAll(async () => {
  await initializeDatabase();
  const user = await User.findOne({
    where: {
      email: "example@example.com"
    }
  });

  if (user) {
    await User.destroy({
      where: {
        email: "example@example.com"
      }
    });
    console.log('Kullanıcı silindi.');
  } else {
    console.log('Kullanıcı zaten yok.');
  }
});

describe('POST /auth', () => {
  it('should register a new user and return 201', async () => {
    const newUser = {
      name: "example",
      surname: "example",
      email: "example@example.com",
      password: "123456"
    };

    const response = await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(201);
    expect(response.body).toHaveProperty('email', 'example@example.com');
  });
  it('should login the user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "example@example.com",
        password: "123456"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});

afterAll(async () => {
  await shutdown();
});