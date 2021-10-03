const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./posts");

const LikesSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
  },
});

const Likes = mongoose.model("likes", LikesSchema);

module.exports = Likes;
