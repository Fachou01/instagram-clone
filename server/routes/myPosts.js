const PostModel = require("../models/posts");
const Comment = require("../models/comments");
const User = require("../models/user");

const express = require("express");
const router = express.Router();

router.get("/myposts/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const userNameBD = await User.find({ userName: userName });
    const id = userNameBD[0]._id;
    result = await PostModel.find({ userId: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/profilepost/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    result = await Comment.find({ postId: postId }).populate("userId");
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

module.exports = router;
