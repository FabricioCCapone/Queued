//Movie model file
const mongoose = require('mongoose');

// Movie schema with id, title, director, and year fields
const MovieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    }
});

module.exports = mongoose.model('Movie', MovieSchema);
