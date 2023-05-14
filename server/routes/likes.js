const PostModel = require("../models/posts");
const Likes = require("../models/likes");

const express = require("express");
const router = express.Router();

router.get("/check-like/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.query;

    const like = await Likes.findOne({ userId: userId, postId: postId });

    if (like) {
      return res.status(200).json({
        message: "Likes found",
      });
    }
      return res.status(200).json({
        message: "Likes not found",
      });
  
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const like = new Likes({
      userId: userId,
      postId: postId,
    });

    const likeSaved = await like.save();

    if(likeSaved){

      const result = await PostModel.updateOne(
        { _id: postId },
        {
          $inc: {
            likes: +1,
          },
        }
      );
      return res.status(201).json(result);
    }

    throw new Error("Like not saved");
    
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.query;

    const like = await Likes.deleteOne({ userId: userId, postId: postId });

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
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
