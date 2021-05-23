const express = require('express');
const router = express.Router();
const Post = require('../database/Models/Post');
//@route GET /feed
//@desc Get feed of posts
//@access Public
router.get('/', async (req, res) => {
    let posts = await Post.find().sort({ postedOn: 'desc' });
    res.render('feed', { posts: posts, req: req });
});

module.exports = router;
