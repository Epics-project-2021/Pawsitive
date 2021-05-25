const express = require('express');
const router = express.Router();
const Post = require('../database/Models/Post');
const User = require('../database/Models/User');
//@route POST /delete/:postId
//@desc delete post
//@access Private
router.post('/:postId', (req, res) => {
    const postId = req.params.postId;
    const user = req.user;
    User.findOneAndUpdate(
        { _id: req.user.id },
        {
            $pull: {
                posts: postId,
            },
        },
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
    Post.findOneAndDelete({ _id: postId }, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/feed');
        }
    });
});

//@route GET /delete/:postId/:commentId
//@desc delete comment
//@access Private

router.get('/:postId/:commentId', (req, res) => {
    const postId = req.params.postId;
    const commentId = parseInt(req.params.commentId);
    Post.findOneAndUpdate(
        { _id: postId },
        {
            $pull: {
                comments: {
                    id: commentId,
                },
            },
        },
        (err) => {
            if (err) console.log(err);
            else {
                res.redirect('/feed');
            }
        }
    );
});

module.exports = router;
