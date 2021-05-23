const express = require('express');
const router = express.Router();
const User = require('../database/Models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
//@route GET /auth/signin
//@desc get signin page
//@access Public
router.get('/signin', (req, res) =>
    res.render('signin', {
        req: req,
    })
);

//@route GET /auth/signup
//@desc Get sign up page.
//@access Public
router.get('/signup', (req, res) =>
    res.render('signup', {
        req: req,
    })
);

//@route POST /auth/signup
//@desc sigup the user and save it's data in database
//@access Public
router.post('/signup', async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;
    if (!email || !password || !confirmPassword) {
        //check whether fields are empty
        // res.render('signup', {
        //     err: 'All fields required!',
        //     req: req,
        // });
        res.status(400).json({ msg: 'Empty credentials' });
    } else if (password != confirmPassword) {
        //check whether passwords match
        // res.render('signup', {
        //     err: "Passwords don't match!",
        //     req: req
        // });
        res.status(400).json({ msg: 'Password do not match ' });
    } else {
        //check if user already exist
        User.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            if (data) {
                // res.render('signup', {
                //     err: 'User Exists, Try Logging In!',

                //     req: req,

                // });
                res.status(400).json({ msg: 'User already exist' });
            } else {
                //generate the salt
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    //hash the password
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;

                        const user = new User({
                            name: name,
                            email: email,
                            password: hash,
                            googleId: null,
                            provider: 'email',
                        });
                        user.save((err, data) => {
                            if (err) throw err;
                            res.redirect('/feed');
                        });
                    });
                });
                //save user in db
                //login the user
            }
        });
    }
});

//@route POST /auth/login
//@desc login the user
//@access Public
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/auth/signup',
        successRedirect: '/feed',
    })(req, res, next);
});

//@route GET /auth/logout
//@desc logout the user
//@access Private
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.redirect('/');
    });
});
module.exports = router;
