var express = require("express");
var router = express.Router();

const passport = require("passport");
const LocalStategy = require("passport-local");
const UserCollection = require("../models/user.schema");
const { isLoggedIn } = require("../middleware/auth");

passport.use(new LocalStategy(UserCollection.authenticate()));

router.post("/register", async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const nonChangableData = { username, email };
        const encryptedData = password;
        await UserCollection.register(nonChangableData, encryptedData);
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/user/profile",
        failureRedirect: "/login",
    }),
    (req, res, next) => {}
);

router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("profile", { title: "Profile | Socialmedia", user: req.user });
});

router.get("/logout", isLoggedIn, (req, res, next) => {
    req.logout(() => {
        res.redirect("/login");
    });
});

module.exports = router;
