const express = require('express');
const router = express.Router();

//@route GET /auth/signin
//@desc get signin page
//@access Public
router.get('/signin', (req, res) => res.render('signin'));

//@route GET /auth/signup
//@desc Get sign up page.
//@access Public
router.get('/signup', (req, res) => res.render('signup'));
module.exports = router;
