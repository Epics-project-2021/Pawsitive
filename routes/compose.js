const express = require('express');
const router = express.Router();
const User = require('../database/Models/User');
const Post = require('../database/Models/Post');
const upload = require('./multer');
const cloudinary = require('cloudinary');
require('./cloudinary');
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
router.post('/', upload.single('img'), async (req, res) => {
    const { title, phone, content, area, selectPickerRequirement } = req.body;
    let img_url = '/images/1.jpg';
    if (!req.file) {
        img_url = '/images/1.jpg';
    } else {
        const img = await cloudinary.v2.uploader.upload(req.file.path);

        img_url = img.secure_url;
    }

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
                img: img_url,
                requirement: selectPickerRequirement,
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
