const express = require('express');

//controller funtions
const { loginUser, registerUser } = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// register route
router.post('/register', registerUser);

module.exports = router;