const mongoose = require("mongoose");
const User = require("./user");
const Likes = require("./likes");
const Comments = require("./comments");

const PostsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'likes'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment',
  }]
},
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("posts", PostsSchema);

module.exports = Posts;
