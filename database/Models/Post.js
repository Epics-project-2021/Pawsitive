const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    author: {
        type: String,
    },
    name: {
        type: String,
    },
    area: {
        type: String,
        required: true,
    },
    requirement: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    postedOn: {
        type: Date,
        default: Date.now,
    },
    edited: {
        type: Boolean,
        default: false,
    },
    img: {
        type: String,
        default: '/images/1.jpg',
    },
    comments: [
        {
            id: Number,
            comment: String,
            username: String,
            userid: String,
        },
    ],
});
module.exports = mongoose.model('Post', postSchema);
