var express = require("express");
var router = express.Router();

const passport = require("passport");
const LocalStategy = require("passport-local");
const UserCollection = require("../models/user.schema");

passport.use(new LocalStategy(UserCollection.authenticate()));

router.post("/register", async (req, res, next) => {
    try {
        res.json(req.body);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

module.exports = router;
