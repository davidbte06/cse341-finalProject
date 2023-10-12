const express = require('express');
const router = express.Router();

const showsController = require('../controllers/tvshows');

// Get all TV shows
router.get('/', showsController.getAll);

// Get a single TV show by ID
router.get('/:id', showsController.getSingle);

// Create a new TV show
router.post('/', showsController.createShow);

// Update a TV show by ID
router.put('/:id', showsController.updateShow);

// Delete a TV show by ID
router.delete('/:id', showsController.deleteShow);

module.exports = router;