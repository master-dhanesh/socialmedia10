const express = require("express");
const router = express.Router();
const {
    UserRegister,
    RegisterPage,
    LoginPage,
    UserLogin,
    UserLogout,
    isLoggedIn,
    UserProfile

} = require("../controllers/index")
// GET home Page
router.get("/",isLoggedIn, (req, res, next) => {
    res.render("home");
});
// GET /user/reg
router.get("/reg",RegisterPage );
// Post /user/register
router.post("/register",UserRegister)
// GET /user/log
router.get("/log",LoginPage );
// Post /user/login
router.post("/login",UserLogin)
// GET /user/logout
router.get("/logout",isLoggedIn,UserLogout)
// Get /User/profile
router.get('/profile', isLoggedIn,UserProfile);


module.exports = router;
