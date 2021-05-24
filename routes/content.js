const express = require("express");
const { concat } = require("lodash");
const router = express.Router();
const Post = require("../database/Models/Post");
//@route GET /content/:postid
//@desc Get post content
//@access Public
router.get("/:postid", async (req, res) => {
  const postId = req.params.postid;
  try {
    const post = await Post.findOne({ _id: postId });
    res.render("post-content", {
      post: post,
      reqURL: postId,
      req: req,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST /content/:postid
//@desc Post comment on that post
//@access Private
router.post("/:postid", (req, res) => {
  if (req.isAuthenticated()) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0"
    );
    const reqId = req.params.postid;
    const comment = req.body.comment;
    if (comment != "") {
      Post.findOne({ _id: reqId }, (err, post) => {
        if (err) {
          console.log(err);
        }
        if (post) {
          const obj = {
            id: Math.round(Math.random() * 100000),
            comment: comment,
            username: req.user.name,
          };
          Post.updateOne(
            { _id: reqId },
            { $push: { comments: obj } },
            (err) => {
              if (err) {
                console.log(err);
              }
              res.redirect("/content/" + reqId);
            }
          );
        }
      });
    } else {
      res.redirect("/content/" + reqId);
    }
  } else {
    res.redirect("/auth/signin");
  }
});
module.exports = router;
