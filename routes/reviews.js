const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviews')

const { isAuthenticated } = require("../middleware/authenticate")

// Get all reviews
router.get('/', reviewsController.getAll);

// Get a single review by ID
router.get('/:id', reviewsController.getSingle);

// Create a new review
router.post('/', isAuthenticated, reviewsController.createReview);

// Update a review by ID
router.put('/:id', isAuthenticated, reviewsController.updateReview);

// Delete a review by ID
router.delete('/:id', isAuthenticated, reviewsController.deleteReview);

module.exports = router;