const express = require('express');
const router = express.Router();
const User = require('../database/Models/User');
const Post = require('../database/Models/Post');
//@route GET /compose
//@desc get compose page
//@access Private
router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        res.set(
            'Cache-Control',
            'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0'
        );
        res.render('compose', {
            user: req.user,
            req: req,
        });
    } else {
        res.redirect('/auth/signin');
    }
});

//@route POST /compose
//@desc Post your posts.
//@access Private
router.post('/', async (req, res) => {
    const { title, phone, content, area } = req.body;
    User.findById(req.user.id, function (err, user) {
        if (err) console.log(err);
        if (user) {
            const newPost = new Post({
                title: title,
                area: area,
                phone: phone,
                name: user.name,
                author: user.id.toString(),
                content: content,
                comments: [],
            });
            newPost.save(function (err) {
                if (err) console.log(err);
                else {
                    user.posts.push(newPost.id);
                    user.save(function () {
                        res.redirect('/feed');
                    });
                }
            });
        }
    });
});
module.exports = router;
