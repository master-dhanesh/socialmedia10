const express = require("express");
const PostCollection = require("../models/post.schema");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const posts = await PostCollection.find().populate("user");

        res.render("index", {
            title: "Homepage | SocialMedia",
            user: req.user,
            posts: posts,
        });
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.get("/about", (req, res) => {
    res.render("about", { title: "About | SocialMedia", user: req.user });
});

router.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact | SocialMedia", user: req.user });
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Login | SocialMedia", user: req.user });
});

router.get("/register", (req, res) => {
    res.render("register", { title: "Register | SocialMedia", user: req.user });
});

router.get("/forget-email", (req, res) => {
    res.render("forgetemail", {
        title: "Forgot Password  | SocialMedia",
        user: req.user,
    });
});

router.get("/verify-otp/:id", (req, res) => {
    res.render("forgetOTP", {
        title: "Verify OTP  | SocialMedia",
        user: req.user,
        id: req.params.id,
    });
});

module.exports = router;
