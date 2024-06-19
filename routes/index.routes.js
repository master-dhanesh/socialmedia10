const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Homepage | SocialMedia" });
});

router.get("/about", (req, res) => {
    res.render("about", { title: "About | SocialMedia" });
});

router.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact | SocialMedia" });
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Login | SocialMedia" });
});

module.exports = router;
