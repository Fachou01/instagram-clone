const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./posts");

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
  },
  content: {
    type: String,
  },
},
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("comment", CommentSchema);

module.exports = Comments;
