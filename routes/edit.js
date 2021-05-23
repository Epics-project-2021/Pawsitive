const express = require('express');
const router = express.Router();

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
                    title: post.title,
                    name: post.name,
                    loaction: post.location,
                    content: post.content,
                    reqURL: '/edit/' + requestedPostId,
                    req: req,
                });
            }
        });
    } else {
        res.redirect('/signin');
    }
});

//@route POST /edit
//@desc Edit your posts.
//@access Private
router.post('/', (req, res) => res.send('EDIT HERE'));
module.exports = router;
