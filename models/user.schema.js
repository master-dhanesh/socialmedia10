const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        avatar: {
            type: String,
            default:
                "https://ik.imagekit.io/nea65x1oy/default-image.png?updatedAt=1719377803574",
        },
        otp: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

userSchema.plugin(plm);

const UserCollection = mongoose.model("user", userSchema);

module.exports = UserCollection;
