const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const imagekit = require("../utils/imagekit");
const PostCollection = require("../models/post.schema");

router.get("/create", isLoggedIn, function (req, res, next) {
    res.render("createpost", {
        title: "Create Post | SocialMedia",
        user: req.user,
    });
});

router.post("/create", isLoggedIn, async function (req, res, next) {
    try {
        const newPost = new PostCollection(req.body);

        const { fileId, url, thumbnailUrl } = await imagekit.upload({
            file: req.files.media.data,
            fileName: req.files.media.name,
        });

        newPost.media = { fileId, url, thumbnailUrl };
        newPost.user = req.user._id;

        req.user.posts.push(newPost._id);

        await newPost.save();
        await req.user.save();

        res.redirect("/user/profile");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.get("/like/:pid", isLoggedIn, async function (req, res, next) {
    try {
        const post = await PostCollection.findById(req.params.pid);
        if (post.likes.includes(req.user._id)) {
            const uidx = post.likes.indexOf(req.user._id);
            post.likes.splice(uidx, 1);
        } else {
            post.likes.push(req.user._id);
        }

        await post.save();
        res.redirect("/user/profile");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

module.exports = router;
