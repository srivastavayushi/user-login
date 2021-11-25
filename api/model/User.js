const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone :{
        type: Number,
        required: true,
        min: 10
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);