const PostModel = require("../models/posts");
const User = require('../models/user');
const Comment = require('../models/comments');
const Friends = require('../models/friends');

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await PostModel.find({}).populate("userId").populate({
      path: 'comments',
      populate: {
        path: 'userId',
      }
    }).sort({"createdAt": "desc"});
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/user/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.find({ userName: userName });
    const id = user[0]._id;

    const result = await PostModel.find({ userId: id }).sort({"createdAt": "desc"});
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/profilepost/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    result = await Comment.find({ postId: postId }).populate("userId").sort({"createdAt": "desc"});
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/friends/:userId", async (req, res) => {

  const {userId} = req.params;

  try {
    const friends = await Friends.find({ userId: userId });

    if (friends.length === 0) {
      return res.status(200).json(friends);
    }

    const posts = await PostModel.find({
      userId: { $in: friends[0].following },
    }).populate("userId").populate("likes.userId").populate('comments.userId').sort({"createdAt": "desc"});

    if (posts.length === 0) {
      return res.status(200).json(posts);
    }

    return res.status(200).json(posts);

  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {

  try {
    const { id, title, image, description } = req.body;

    const post = new PostModel({
      userId: id,
      title: title,
      image: image,
      description: description,
    });

    const result = await post.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
