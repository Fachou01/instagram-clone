const mongoose = require("mongoose");
const User = require("./user");

const PostsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  createdAt: {
    type: Date,
    default: new Date(),
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
  },
  liked :{
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Posts = mongoose.model("posts", PostsSchema);

module.exports = Posts;
