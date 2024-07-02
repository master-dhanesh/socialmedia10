const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        avatar: {
            fileId: String,
            url: String,
            thumbnailUrl: String,
        },
        otp: {
            type: Number,
            default: 0,
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    },
    { timestamps: true }
);

userSchema.plugin(plm);

const UserCollection = mongoose.model("user", userSchema);

module.exports = UserCollection;
