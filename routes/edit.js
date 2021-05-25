const express = require('express');
const router = express.Router();
const Post = require('../database/Models/Post');
//@route GET /edit
//@desc get edit page
//@access Private
router.get('/:postId', (req, res) => {
    if (req.isAuthenticated()) {
        const requestedPostId = req.params.postId;
        Post.findOne({ _id: requestedPostId }, function (err, post) {
            if (err) console.log(err);
            if (post) {
                res.render('edit', {
                    post: post,
                    reqURL: '/edit/' + requestedPostId,
                    req: req,
                });
            }
        });
    } else {
        res.redirect('/auth/signin');
    }
});

//@route POST /edit
//@desc Edit your posts.
//@access Private
router.post('/:postId', (req, res) => {
    const reqId = req.params.postId;
    const { title, phone, content, area, selectPickerRequirement } = req.body;
    Post.findOneAndUpdate(
        { _id: reqId },
        {
            $set: {
                title: title,
                content: content,
                phone: phone,
                area: area,
                requirement: selectPickerRequirement,
                edited: true,
            },
        },
        {
            new: true,
        },
        (err, post) => {
            if (err) {
                console.log(err.message);
            } else {
                res.redirect('/feed');
            }
        }
    );
});
module.exports = router;
