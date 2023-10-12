const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all TV shows
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('tvshows').find();
    const tvshows = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(tvshows);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// Get a single TV show by ID
const getSingle = async (req, res) => {
  try {
    const showId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({
        error: 'Invalid ObjectId'
      });
      return;
    }
    const result = await mongodb.getDatabase().db().collection('tvshows').find({
      _id: showId
    });
    const tvshows = await result.toArray();
    if (tvshows.length === 0) {
      res.status(404).json({
        error: 'TV show not found'
      });
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(tvshows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// Create a TV show
const createShow = async (req, res) => {
  try {
    if (!req.body || !req.body.TITLE || !req.body.GENRE || !req.body.SEASONS || !req.body.CREATOR || !req.body.CAST || !req.body.RATING) {
      res.status(400).json('Missing required data in the request body');
      return;
    }
    const show = {
      TITLE: req.body.TITLE,
      GENRE: req.body.GENRE,
      SEASONS: req.body.SEASONS,
      CREATOR: req.body.CREATOR,
      CAST: req.body.CAST,
      RATING: req.body.RATING,
    };
    const response = await mongodb.getDatabase().db().collection('tvshows').insertOne(show);
    if (response.acknowledged) {
      res.status(201).json('TV show created successfully');
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the TV show');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// Update a TV show by ID
const updateShow = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json('TV show ID is missing in the request parameters');
      return;
    }
    const showId = new ObjectId(req.params.id);
    const updatedShow = {
      TITLE: req.body.TITLE,
      GENRE: req.body.GENRE,
      SEASONS: req.body.SEASONS,
      CREATOR: req.body.CREATOR,
      CAST: req.body.CAST,
      RATING: req.body.RATING,
    };
    const response = await mongodb.getDatabase().db().collection('tvshows').updateOne({
      _id: showId
    }, {
      $set: updatedShow
    });
    if (response.modifiedCount > 0) {
      res.status(204).json('TV show updated successfully');
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the TV show');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

// Delete a TV show by ID
const deleteShow = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json('TV show ID is missing in the request parameters');
      return;
    }
    const showId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('tvshows').deleteOne({
      _id: showId
    });
    if (response.deletedCount > 0) {
      res.status(204).json('TV show deleted successfully');
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the TV show');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = {
  getAll,
  getSingle,
  createShow,
  updateShow,
  deleteShow
};
