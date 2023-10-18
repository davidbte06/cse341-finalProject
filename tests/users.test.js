const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/users.js');

app.use(express.json());
app.use(router);

describe('GET /users', () => {
    it('should return all users', async () => {
    const response = await request(app).get('/users');
expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String)
            })]));
    });
});

describe('GET /users/:id', () => {
    it('should return a single user by ID', async () => {
        const response = await request(app).get('/users/652ef04f8bcda9558858b886');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String)
        }));
    });
});

describe('POST /users', () => {
    it('should create a new user', async () => {
        const response = await request(app).post('/users').send({
            name: 'John Doe'
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: 'John Doe'
        }));
    });
});

describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
        const response = await request(app).put('/users/1').send({
            name: 'Jane Doe'
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: 'Jane Doe'
        }));
  });
});

describe('DELETE /users/:id', () => {
    it('should delete a user by ID', async () => {
        const response = await request(app).delete('/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String)
        }));
    });
});