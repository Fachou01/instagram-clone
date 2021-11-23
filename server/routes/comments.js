const Comment = require("../models/comments");

const express = require("express");
const router = express.Router();

router.post("/addcomment", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const comment = req.body.comment;
  const newComment = new Comment({
    userId: userId,
    postId: postId,
    description: comment,
  });
  try {
    const response = await newComment.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(error);
    console.log(err);
  }
});

router.post("/getcomment", async (req, res) => {
  const postId = req.body.postId;

  try {
    result = await Comment.find({ postId: postId }).populate("userId");
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

router.post("/removecomment", async (req, res) => {
  const commId = req.body.commId;
  try {
    const response = await Comment.deleteOne({ _id: commId });
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

module.exports = router;
