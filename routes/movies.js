const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

const { isAuthenticated } = require("../middleware/authenticate")

// Get all movies
router.get('/', moviesController.getAllMovies);

// Get a single movie by ID
router.get('/:id', moviesController.getSingleMovie);

// Create a new movie
router.post('/', isAuthenticated, moviesController.createMovie);

// Update an existing movie
router.put('/:id', isAuthenticated, moviesController.updateMovie);

// Delete a movie by ID
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;