const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const imagekit = require("../utils/imagekit");
const PostCollection = require("../models/post.schema");

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

        res.send("Post Created!");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

module.exports = router;
