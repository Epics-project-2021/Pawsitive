const express = require('express');
const router = express.Router();

//@route GET /edit
//@desc get edit page
//@access Private
router.get('/', (req, res) => res.render('edit'));

//@route POST /edit
//@desc Edit your posts.
//@access Private
router.post('/', (req, res) => res.send('EDIT HERE'));
module.exports = router;
