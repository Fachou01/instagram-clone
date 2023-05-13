const Comment = require("../models/comments");

const express = require("express");
const router = express.Router();

router.post("/addcomment", async (req, res) => {
  try {
    const { userId, postId, comment } = req.body;

    const newComment = new Comment({
      userId: userId,
      postId: postId,
      description: comment,
    });
    const result = await newComment.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/getcomment", async (req, res) => {
  try {
    const { postId } = req.body;

    const result = await Comment.find({ postId: postId }).populate("userId");
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/removecomment", async (req, res) => {

  try {
    const { commId } = req.body;
    const result = await Comment.deleteOne({ _id: commId });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
