const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const movieRoutes = require('./routes/movie');
const userRoutes = require('./routes/user');

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

// Middleware
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// Routes

app.use(movieRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});