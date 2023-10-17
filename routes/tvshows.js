const express = require('express');
const router = express.Router();

const showsController = require('../controllers/tvshows');

const { isAuthenticated } = require("../middleware/authenticate")

// Get all TV shows
router.get('/', showsController.getAll);

// Get a single TV show by ID
router.get('/:id', showsController.getSingle);

// Create a new TV show
router.post('/', isAuthenticated, showsController.createShow);

// Update a TV show by ID
router.put('/:id', isAuthenticated, showsController.updateShow);

// Delete a TV show by ID
router.delete('/:id', isAuthenticated, showsController.deleteShow);

module.exports = router;