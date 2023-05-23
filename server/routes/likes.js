const Like = require('../models/likes');
const Post = require("../models/posts");

const express = require("express");
const router = express.Router();

router.get("/check-like/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.query;

    const like = await Like.findOne({userId,postId});

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
    return res.status(400).json('error occured');
  }
});

router.post("/", async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);

    if(!post){
      return res.status(400).json('Post not found');
    }

    const postLike = {
      userId: userId,
      postId: postId
    }

    const like = await Like.create(postLike);

    if (like) {
      post.likes.push(like._id);
      const result = await post.save();
      return res.status(201).json(result);
    }
    return res.status(400).json('error occured');

  } catch (error) {
    console.log(error);
    return res.status(400).json('error occured');
  }
});

router.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.query;

    const like = await Like.findOneAndDelete({userId,postId});

    if(like){
      const result = await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $pull: {
            likes: like._id,
          },
        }
      );
      return res.status(200).json(result);
    }
    return res.status(400).json('error occured');

  } catch (error) {
    console.log(error);
    return res.status(400).json('error occured');
  }
});

module.exports = router;
