//Routes for movies
const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('../controllers/movieControllers');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.json({ message: error });
  }
});

// Get a specific movie
router.get('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    res.json(movie);
  } catch (error) {
    res.json({ message: error });
  }
});

// Add a movie
router.post('/', async (req, res) => {
  const { title, director, year } = req.body;
  try {
    const movie = await Movie.create({ title, director, year });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Update a movie
router.patch('/:movieId', async (req, res) => {
  try {
    const updatedMovie = await Movie.updateOne(
      { _id: req.params.movieId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedMovie);
  } catch (error) {
    res.json({ message: error });
  }
});

// Delete a movie
router.delete('/:movieId', async (req, res) => {
  try {
    const removedMovie = await Movie.remove({ _id: req.params.movieId });
    res.json(removedMovie);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
