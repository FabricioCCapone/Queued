//Routes for movies
const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('../controllers/movieControllers');
const requireAuth = require('../middleware/requireAuth');

// Get all movies
router.get('/api/movies', requireAuth, getMovies);

// Get a specific movie
router.get('/api/:movieId', requireAuth, getMovieById);

// Add a movie
router.post('/api/addMovie', requireAuth, createMovie);

// Update a movie
router.patch('/api/:movieId', requireAuth, updateMovie);

// Delete a movie
router.delete('/api/:movieId', requireAuth, deleteMovie);

module.exports = router;
