// config dotenv
require("dotenv").config({ path: "./.env" });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const app = express();

// connect to database
require("./models/database").connectDB();

// configure views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes

app.use("/user", require("./routes/user.routes"));






// server
app.listen(process.env.PORT, () => {
    console.log(`Server is running:${process.env.PORT}`);
});
