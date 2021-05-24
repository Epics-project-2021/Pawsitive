const express = require("express");
const router = express.Router();
const User = require("../database/Models/User");
const Post = require("../database/Models/Post");
//defining sorting criteria for profile page posts
function compare(a, b) {
  if (a.postedOn < b.postedOn) {
    return 1;
  }
  if (a.postedOn > b.postedOn) {
    return -1;
  }
  return 0;
}
//@route GET /profile/:id
//@desc Get profile
//@access Private
router.get("/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.params.id;

    //get user
    if (userId === req.user.id) {
      const user = await User.findById(userId);
      Promise.all(
        user.posts.map((postId) =>
          Post.findOne({ _id: postId })
            .exec()
            .catch((err) => console.error)
        )
      )
        .then((posts) => {
          console.log(posts);
          res.render("profile", {
            posts: posts.sort(compare),
            req: req,
          });
        })
        .catch((err) => console.error(err));
    } else {
      res.redirect("/auth/signup");
    }
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
