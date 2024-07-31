//Routes for movies
const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('../controllers/movieControllers');

// Get all movies
router.get('/', getMovies);

// Get a specific movie
router.get('/:movieId', getMovieById);

// Add a movie
router.post('/', createMovie);

// Update a movie
router.patch('/:movieId', updateMovie);

// Delete a movie
router.delete('/:movieId', deleteMovie);

module.exports = router;
