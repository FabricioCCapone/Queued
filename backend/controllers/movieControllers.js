// Movie Controller 
// Methods: getMovies, getMovieById, createMovie, updateMovie, deleteMovie

const Movie = require('../models/movieModel');
const mongoose = require('mongoose');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get a movie by id
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = async (req, res) => {
    try {
        const { movieId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(404).json({ message: 'Invalid movie ID' });
        }
        const movie = await Movie.findById(movieId);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Create a movie
// @route   POST /api/movies
// @access  Public
const createMovie = async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        rating: req.body.rating,
        review: req.body.review,
        genres: req.body.genres,
        duration: req.body.duration,
        posterUrl: req.body.posterUrl
    });

    let emptyFields = [];
    if (!movie.title) emptyFields.push('Title');
    if (!movie.director) emptyFields.push('Director');
    if (!movie.year) emptyFields.push('Year');
    if (!movie.rating) emptyFields.push('Rating');
    if (!movie.review) emptyFields.push('Review');
    if (!movie.genres) emptyFields.push('Genres');
    if (!movie.duration) emptyFields.push('Duration');
    if (!movie.posterUrl) emptyFields.push('Poster URL');

    if (emptyFields.length > 0) {
        return res.status(400).json({error : 'Missing fields:',  emptyFields});
    }

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });   
    }
}

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Public
const updateMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(404).json({ message: 'Invalid movie ID' });
        }
        const movie = await Movie.findOneAndUpdate({ _id: movieId }, { ...req.body });

        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
        } else {
            res.status(200).json(movie);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Public
const deleteMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(404).json({ message: 'Invalid movie ID' });
        }
        const movie = await Movie.findOneAndDelete({ _id: movieId });
        if (movie) {
            res.status(200).json({ message: 'Movie removed' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}