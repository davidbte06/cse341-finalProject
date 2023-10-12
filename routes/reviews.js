const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviews')

// Get all reviews
router.get('/', reviewsController.getAll);

// Get a single review by ID
router.get('/:id', reviewsController.getSingle);

// Create a new review
router.post('/', reviewsController.createReview);

// Update a review by ID
router.put('/:id', reviewsController.updateReview);

// Delete a review by ID
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;