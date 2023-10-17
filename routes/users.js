const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

const { isAuthenticated } = require("../middleware/authenticate")

// Get all users
router.get('/', userController.getAllUsers);

// Get a single user by ID
router.get('/:id', userController.getSingleUser);

// Create a new user
router.post('/', isAuthenticated, userController.createUser);

// Update an existing user
router.put('/:id', isAuthenticated, userController.updateUser);

// Delete a user by ID
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;
