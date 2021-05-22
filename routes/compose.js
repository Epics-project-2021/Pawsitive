const express = require('express');
const router = express.Router();

//@route GET /compose
//@desc get compose page
//@access Private
router.get('/', (req, res) => res.render('compose'));

//@route POST /compose
//@desc Post your posts.
//@access Private
router.post('/', (req, res) => res.send('POST HERE'));
module.exports = router;
