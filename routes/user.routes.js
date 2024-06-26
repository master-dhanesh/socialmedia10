var express = require("express");
var router = express.Router();
const path = require("path");

const passport = require("passport");
const LocalStategy = require("passport-local");
const UserCollection = require("../models/user.schema");
const { isLoggedIn } = require("../middleware/auth");
const { sendMail } = require("../utils/sendmail");
const imagekit = require("../utils/imagekit");

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

router.post("/send-mail", async (req, res, next) => {
    try {
        const user = await UserCollection.findOne({ email: req.body.email });
        if (!user)
            return res.send(
                "No user found with this email. <a href='/forget-email'>Try Again</a>"
            );

        await sendMail(req, res, user);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.post("/verify-otp/:id", async (req, res, next) => {
    try {
        const user = await UserCollection.findById(req.params.id);
        if (!user) return res.send("No user found.");

        if (user.otp != req.body.otp) {
            user.otp = 0;
            await user.save();
            return res.send(
                "Invalid OTP. <a href='/forget-email'>Try Again</a>"
            );
        }

        user.otp = 0;
        await user.setPassword(req.body.password);
        await user.save();
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.get("/settings", isLoggedIn, (req, res, next) => {
    res.render("settings", { title: "Settings | Socialmedia", user: req.user });
});

router.post("/avatar/:id", isLoggedIn, async (req, res, next) => {
    try {
        const result = await imagekit.upload({
            file: req.files.avatar.data,
            fileName: Date.now() + path.extname(req.files.avatar.name),
        });
        console.log(result);

        res.redirect("/user/settings");
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

module.exports = router;
