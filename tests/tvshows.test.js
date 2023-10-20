const request = require('supertest');
const express = require('express');
const showsRouter = require('../routes/tvshows');

const app = express();
app.use('/tvshows', showsRouter);

describe('TV Show API Routes', () => {
    it('should get all TV shows', async () => {
        const response = await request(app).get('/tvshows');
        expect(response.status).toBe(200);
    });

    it('should get a single TV show by ID', async () => {
        const response = await request(app).get('/tvshows/652ef2db8bcda9558858b88e');
        expect(response.status).toBe(200);
    });

    it('should create a new TV show', async () => {
        const newShow = {
            title: 'Sample Show',
            genre: ['Drama', 'Mystery'],
            releaseYear: 2023,
            director: 'Sample Director',
            mainCast: ['Actor A', 'Actress B'],
            rating: 9.0,
        };
        const response = await request(app)
            .post('/tvshows')
            .send(newShow);
        expect(response.status).toBe(201);
    });

    it('should update a TV show by ID', async () => {
        const updatedShow = {
            title: 'Updated Show Title',
        };
        const response = await request(app)
            .put('/tvshows/652ef2db8bcda9558858b88e')
            .send(updatedShow);
        expect(response.status).toBe(200);
    });

    it('should delete a TV show by ID', async () => {
        const response = await request(app).delete('/tvshows/652ef2db8bcda9558858b88e');
        expect(response.status).toBe(204);
    });
});