const PostModel = require("../models/posts");
const Likes = require("../models/likes");

const express = require("express");
const router = express.Router();

router.post("/getlike", async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const result = await Likes.find({ userId: userId, postId: postId });

    if (result.length > 0) {
      return res.status(200).json({
        message: "Likes found",
      });
    } else {
      return res.status(200).json({
        message: "Likes not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.put("/addlike", async (req, res) => {
  try {
    const postId = req.body.id;

    const result = await PostModel.updateOne(
      { _id: postId },
      {
        $inc: {
          likes: +1,
        },
      }
    );
    return res.status(201).json(result);
  } catch (error) {
    console.log("error");
    return res.status(400).json(error);
  }
});

router.post("/addlike/likes", async (req, res) => {
  try {
  const {userId, postId} = req.body;

  const newLike = new Likes({
    userId: userId,
    postId: postId,
  });
    const result = await newLike.save();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);

  }
});

router.put("/removelike", async (req, res) => {
  try {
    const postId = req.body.id;

    const result = await PostModel.updateOne(
      { _id: postId },
      {
        $inc: {
          likes: -1,
        },
      }
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log("error");
    return res.status(400).json(error);
  }
});

router.post("/removelike/likes", async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const result = await Likes.deleteOne({ userId: userId, postId: postId });
    return res.status(200).json(result);
  } catch (error) {
    console.log(err);
    return res.status(400).json(error);
  }
});

module.exports = router;
