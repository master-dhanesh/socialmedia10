const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Homepage | SocialMedia", user: req.user });
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

router.get("/forgot", (req, res) => {
    res.render("forgot", {
        title: "Forgot Password  | SocialMedia",
        user: req.user,
    });
});
module.exports = router;
