//Movie model file
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


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
        required: true,
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
    posterUrl: {
        type: String,
        required: true // or false if it's optional
      }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Movie', movieSchema);
