//Movie model file
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the allowed genres
const allowedGenres = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Thriller',
    'Western',
    'Science Fiction',
    'Animation',
    'Adventure',
    'Crime',
    'Documentary',
    'Family',
    'History',
    'Music',
    'War',
    'TV Movie',
    'Foreign',
    'Other'
];

// Movie schema with id, title, director, and year fields
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genres: {
        type: [String],
        enum: allowedGenres,
        required: true,
        validate: {
            validator: function (arr) {
                return arr.length > 0; // Ensure there's at least one genre
            },
            message: 'At least one genre is required.'
        }
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
        max: 500,
    },
    review: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    imageUrl: {
        type: String,
        required: true // or false if it's optional
      }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Movie', movieSchema);
