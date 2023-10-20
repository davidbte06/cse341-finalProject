const request = require('supertest');
const express = require('express');
const reviewsRouter = require('../routes/reviews');
const app = express();
app.use('/reviews', reviewsRouter);

describe('Review API Routes', () => {
  it('should get all reviews', async () => {
    const response = await request(app).get('/reviews');
    expect(response.status).toBe(200);
  });

  it('should get a single review by ID', async () => {
    const response = await request(app).get('/reviews/6525dcb702d7656f2ce0eda5');
    expect(response.status).toBe(200);
  });

  it('should create a new review', async () => {
    const newReview = {
        user: 'User 4',
        content: "The TV show is perfect!!",
        rating: 3,
        mediaType: 'TV Show',
        mediaName: 'Stranger Things',
    };
    const response = await request(app)
      .post('/reviews')
      .send(newReview);
    expect(response.status).toBe(201);
  });

  it('should update a review by ID', async () => {
    const updatedReview = {
        user: 'David Burguete',
        content: "The TV show is perfect!!",
        rating: 3,
        mediaType: 'TV Show',
        mediaName: 'Stranger Things',
    };
    const response = await request(app)
      .put('/reviews/6525dcb702d7656f2ce0eda5')
      .send(updatedReview);
    expect(response.status).toBe(200);
  });

  it('should delete a review by ID', async () => {
    const response = await request(app).delete('/reviews/6525dcb702d7656f2ce0eda5');
    expect(response.status).toBe(204);
  });
});
