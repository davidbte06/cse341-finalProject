const request = require('supertest');
const express = require('express');
const moviesRouter = require('../routes/movies');
const app = express();
app.use('/movies', moviesRouter);

describe('Movie API Routes', () => {
    it('should get all movies', async () => {
        const response = await request(app).get('/movies');
        expect(response.status).toBe(200);
    });

    it('should get a single movie by ID', async () => {
        const response = await request(app).get('/movies/65296ceaa05d58bdd4905425');
        expect(response.status).toBe(200);
    });

    it('should create a new movie', async () => {
        const newMovieData = {
            title: 'The lord of Testings',
            genre: ['Drama'],
            releaseYear: 2023,
            director: 'David Fincher',
            mainCast: ['Brad Pitt', 'Edward Norton'],
            rating: 9,
        };
        const response = await request(app)
            .post('/movies')
            .send(newMovieData);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newMovieData);
    });

    it('should update an existing movie', async () => {
        const updatedMovie = {
            title: 'The lord of Testings',
            genre: ['Drama'],
            releaseYear: 2023,
            director: 'David Burguete',
            mainCast: ['Brad Pitt', 'Edward Norton'],
            rating: 9,
        };
        const response = await request(app)
            .put('/movies/65296ceaa05d58bdd4905425')
            .send(updatedMovie);
        expect(response.status).toBe(200);
    });

    it('should delete a movie by ID', async () => {
        const response = await request(app).delete('/movies/65296ceaa05d58bdd4905425');
        expect(response.status).toBe(204);
    });
});