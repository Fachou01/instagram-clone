const PostModel = require("../models/posts");
const Comment = require("../models/comments");

const express = require("express");
const router = express.Router();

router.get("/myposts/:id", async (req, res) => {
  try {
    const id = req.params.id;
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
