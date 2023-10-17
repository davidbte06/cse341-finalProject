const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getAllUsers = async (req, res) => {
    try {
        //#swagger.tags=['Users']
        const result = await mongodb.getDatabase().db().collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single user by ID
const getSingleUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try {
        //#swagger.tags=['Users']
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                error: 'Invalid ObjectId'
            });
            return;
        }
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId }).toArray();
        if (result.length === 0) {
            res.status(404).json({
                error: 'User not found'
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a user
const createUser = async (req, res) => {
    try {
        //#swagger.tags=['Users']
        if (!req.body || !req.body.username || !req.body.email || !req.body.password || !req.body.role) {
            res.status(400).json('Missing required data in the request body');
            return;
        }

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        };

        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);

        if (response.acknowledged) {
            res.status(201).json('User created successfully');
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        //#swagger.tags=['Users']
        if (!req.params.id) {
            res.status(400).json('User ID is missing in the request parameters');
            return;
        }

        const userId = new ObjectId(req.params.id);
        const updatedUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        };

        const response = await mongodb.getDatabase().db().collection('users').updateOne(
            { _id: userId },
            { $set: updatedUser }
        );

        if (response.modifiedCount > 0) {
            res.status(204).json('User updated successfully');
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        //#swagger.tags=['Users']
        if (!req.params.id) {
            res.status(400).json('User ID is missing in the request parameters');
            return;
        }

        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(204).json('User deleted successfully');
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the user');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
