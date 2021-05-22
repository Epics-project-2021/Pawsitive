const express = require('express');
const router = express.Router();

//@route GET /feed
//@desc Get feed of posts
//@access Public
router.get('/', (req, res) => res.render('feed'));

module.exports = router;
