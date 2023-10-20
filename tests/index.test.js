const express = require('express');
const passport = require('passport');
const request = require('supertest');
const router = require('../routes/index');

const app = express();
app.use(router);

describe('Your Express Router', () => {
  it('should respond to GET /login with a 200 status code', async () => {
    const response = await request(app).get('/login');
    expect(response.status).toBe(200);
  });

  it('should respond to GET /logout with a 200 status code', async () => {
    const response = await request(app).get('/logout');
    expect(response.status).toBe(200);
  });

  it('should handle GET requests for other routes', async () => {
    const response = await request(app).get('/other_route');
    expect(response.status).toBe(404);
  });
});
