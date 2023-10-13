const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    try {
        //#swagger.tags=['Users']
        const result = await mongodb.getDatabase().db().collection('users').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSingleUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try {
        //#swagger.tags=['Users']
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId }).toArray();
        if (result.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        //#swagger.tags=['Users']
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if (response.acknowledged) {
            res.status(201).json(response.ops[0]); // Created
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        //#swagger.tags=['Users']
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(500).json({ error: 'Some error occurred while updating the user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try {
        //#swagger.tags=['Users']
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send(); // No Content
        } else {
            res.status(500).json({ error: 'Some error occurred while deleting the user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
