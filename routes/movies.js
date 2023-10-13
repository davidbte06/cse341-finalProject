const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

// Get all movies
router.get('/', moviesController.getAllMovies);

// Get a single movie by ID
router.get('/:id', moviesController.getSingleMovie);

// Create a new movie
router.post('/', moviesController.createMovie);

// Update an existing movie
router.put('/:id', moviesController.updateMovie);

// Delete a movie by ID
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;