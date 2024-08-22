const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
});

//Static method to register a user
userSchema.statics.register = async function(username, email, password) {

    if(!username || !email || !password) {
        throw new Error('Invalid input.');
    }

    const usernameRegex = /^[a-zA-Z0-9.]+$/;
    if (!usernameRegex.test(username)) {
        throw new Error('Username is invalid.');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Email is invalid.');
    }
    
    const exists = await this.findOne({username});
    if (exists) {
        throw new Error('Username is already in use.');
    }

    const existsEmail = await this.findOne({email});
    if (existsEmail) {
        throw new Error('Email is already in use.');
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error('Password is invalid.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_ = await bcrypt.hash(password, salt);

    const user = await this.create({username, email, password: hashed_});
    return user;
}

//Static method to login a user
userSchema.statics.login = async function(username, password) {
    if(!username || !password) {
        throw new Error('Empty username or password.');
    }

    const user = await this.findOne({username});
    if (!user) {
        throw new Error('Invalid username.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('The password is incorrect. Try again.');
    }

    return user;
}


module.exports = mongoose.model('User', userSchema); 