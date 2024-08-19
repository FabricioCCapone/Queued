const User = require('../models/userModel');

//login user
const loginUser = async (req, res) => {
    res.json({ message: 'Login route'});
}

//register user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.register(username, email, password);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { loginUser, registerUser };