const PostModel = require("../models/posts");
const Likes = require("../models/likes");

const express = require("express");
const router = express.Router();

router.post("/getlike", async (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  try {
    const response = await Likes.find({ userId: userId, postId: postId });
    if (response.length > 0) {
      res.status(200).json({
        message: "Likes found",
      });
    } else {
      res.status(200).json({
        message: "Likes not found",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(401).json({
      message: "error in db",
    });
  }
});

router.put("/addlike", async (req, res) => {
  const postId = req.body.id;
  const like = req.body.like;
  try {
    const newLike = await PostModel.updateOne(
      { _id: postId },
      {
        $inc: {
          likes: +1,
        },
      }
    );
    res.json(newLike);
  } catch (err) {
    console.log("error");
  }
});

router.post("/addlike/likes", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  const newLike = new Likes({
    userId: userId,
    postId: postId,
  });
  try {
    const response = await newLike.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(error);
    console.log(err);
  }
});

router.put("/removelike", async (req, res) => {
  const postId = req.body.id;
  const like = req.body.like;
  try {
    const newLike = await PostModel.updateOne(
      { _id: postId },
      {
        $inc: {
          likes: -1,
        },
      }
    );
    res.json(newLike);
  } catch (err) {
    console.log("error");
  }
});

router.post("/removelike/likes", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  try {
    const response = await Likes.deleteOne({ userId: userId, postId: postId });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(error);
    console.log(err);
  }
});

module.exports = router;
