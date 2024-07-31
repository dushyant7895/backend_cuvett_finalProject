

const mongoose = require('mongoose');

const UsersDetails = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
   
}, { timestamps: true });

module.exports = mongoose.model('User', UsersDetails);
