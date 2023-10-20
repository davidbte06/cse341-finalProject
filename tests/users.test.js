const request = require('supertest');
const express = require('express');
const app = express();

// Import the router
const userRouter = require('../routes/users');

// Use the router in your app
app.use('/users', userRouter);

describe('User Routes', () => {
  // Test for GET /users
  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });

  // Test for GET /users/:id
  it('should get a single user by ID', async () => {
    const response = await request(app).get('/users/652ef0898bcda9558858b888');
    expect(response.status).toBe(200);
  });

  // Test for POST /users
  it('should create a new user', async () => {
    const newUser = {
      username: "New Alexander",
      email: "newalexander@example.com",
      password: "alex_pass123",
      role: "user",
    };
    const response = await request(app)
      .post('/users')
      .send(newUser);
    expect(response.status).toBe(200);
  });

  // Test for PUT /users/:id
  it('should update an existing user', async () => {
    const updatedUser = {
      username: "New Alex",
      email: "newalex@example.com",
      password: "alex_pass123",
      role: "user",
    };
    const response = await request(app)
      .put('/users/652ef0898bcda9558858b888')
      .send(updatedUser);
    expect(response.status).toBe(200);
  });

  // Test for DELETE /users/:id
  it('should delete a user by ID', async () => {
    const response = await request(app).delete('/users/652ef0898bcda9558858b888');
    expect(response.status).toBe(200);
  });
});