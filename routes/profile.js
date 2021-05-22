const express = require('express');
const router = express.Router();

//@route GET /profile/:id
//@desc Get profile
//@access Private
router.get('/:id', (req, res) => res.render('profile'));

module.exports = router;
