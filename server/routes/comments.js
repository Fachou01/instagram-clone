const Comment = require("../models/comments");

const express = require("express");
const router = express.Router();

router.get("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const result = await Comment.find({ postId: postId }).populate("userId");
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Comment.deleteOne({ _id: id });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
