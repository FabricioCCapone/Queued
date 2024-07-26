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
    .then(ç)
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Hello from MERN stack!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});