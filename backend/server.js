const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then()
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Hello from MERN stack!');
});

app.post('/', async (req, res) => {
    const { title, director, year } = req.body;
    const Movie = mongoose.model('Movie', { title: String, director: String, year: Number });
    const movie = new Movie({ title, director, year });
    try {
        const savedMovie = await movie.save();
        res.json(savedMovie);
    } catch (error) {
        res.json({ message: error });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});