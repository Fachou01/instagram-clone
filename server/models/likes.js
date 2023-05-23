const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./posts");

const LikesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
  },
},
  {
    timestamps: true,
  }
);
LikesSchema.index({ userId: 1, postId: 1 }, { unique: true });
const Likes = mongoose.model("likes", LikesSchema);

module.exports = Likes;
