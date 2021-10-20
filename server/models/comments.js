const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./posts");

const CommentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  description: {
    type: String,
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

const Comments = mongoose.model("comment", CommentSchema);

module.exports = Comments;
