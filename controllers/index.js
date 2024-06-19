const User = require("../models/user/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --------User Register------------------
exports.RegisterPage = (req, res, next) => {
  res.render("register");
}
exports.UserRegister = async (req, res) => {

    const { username, fullname, email, password } = req.body;
       console.log(req.body);
    if (!username || !fullname || !email || !password) {
      return res.status(400).send('All fields are required');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
    });
  
    await user.save();
    res.status(201).send('User registered successfully');
}
  // --------User Login------------------

exports.LoginPage = (req, res, next) => {
    res.render("login");
}
exports.UserLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });

  res.send('Login successful');
}
  // --------User LogOut------------------

exports.UserLogout = (req, res) => {
  res.clearCookie('token');
  res.send('Logout successful');
}
  // --------User Profile------------------

exports.UserProfile =  async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  res.send(user);
}
  // -------- isLoggedIn Middelwares------------------

exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Please logged in');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Please logged in');
  }
};