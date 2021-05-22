const express = require('express');
const router = express.Router();

//@route GET /content/:postid
//@desc Get post content
//@access Public
router.get('/:postid', (req, res) => res.render('post-content'));

//@route POST /content/:postid
//@desc Post comment on that post
//@access Private
router.post('/:postid', (req, res) => res.send('Post your comment here'));
module.exports = router;
