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
    rating: {
        type: Number,
        required: false
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Movie', movieSchema);
