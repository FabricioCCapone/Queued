// Movie Controller 
// Methods: getMovies, getMovieById, createMovie, updateMovie, deleteMovie

const Movie = require('../models/movieModel');
const mongoose = require('mongoose');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
    try {
        const user_id = req.user._id;
        const movies = await Movie.find({ user_id }).sort({ createdAt: -1 });
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
// @route   POST /api/addMovies
// @access  Public
const createMovie = async (req, res) => {
    const { title, director, year, genres, duration, review, rating, posterUrl } = req.body;

    let emptyFields = [];

    if (!title) emptyFields.push('title');
    if (!director) emptyFields.push('director');
    if (!year) emptyFields.push('year');
    if (!rating) emptyFields.push('rating');
    if (!review) emptyFields.push('review');
    if (genres.length === 0 || genres[0] === "" ) emptyFields.push('genres');
    if (!duration) emptyFields.push('duration');
    if (!posterUrl) emptyFields.push('posterUrl');

    if (emptyFields.length > 0 && emptyFields[0] !== "") {
        return res.status(400).json({error : 'Missing fields:',  emptyFields});
    }

    try {
        const user_id = req.user._id;
        const movie = new Movie({ title, director, year, genres, duration, review, rating, posterUrl, user_id });
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