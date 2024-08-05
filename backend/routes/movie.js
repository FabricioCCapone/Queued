//Routes for movies
const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('../controllers/movieControllers');

// Get all movies
router.get('/api/movies', getMovies);

// Get a specific movie
router.get('/api/:movieId', getMovieById);

// Add a movie
router.post('/api/addMovie', createMovie);

// Update a movie
router.patch('/api/:movieId', updateMovie);

// Delete a movie
router.delete('/api/:movieId', deleteMovie);

module.exports = router;
