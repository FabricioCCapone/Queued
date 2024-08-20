const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//login user
const loginUser = async (req, res) => {
    res.json({ message: 'Login route'});
}

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

//register user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.register(username, email, password);
        const token = createToken(user._id);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, registerUser };