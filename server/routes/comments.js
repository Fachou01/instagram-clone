const Comment = require("../models/comments");
const Post = require("../models/posts");

const express = require("express");
const router = express.Router();

router.get("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const result = await Comment.find({ postId: postId }).populate("userId");
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json('error occured');
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, postId, content } = req.body;

    const post = await Post.findById(postId);

    if(!post){
      return res.status(400).json('Post not found');
    }

    const postComment = {
      userId: userId,
      postId: postId,
      content: content,
    };

    const comment = await Comment.create(postComment);

    if(comment){
      post.comments.push(comment._id);
      await post.save();
      return res.status(201).json(comment);
    }
    return res.status(400).json('error occured');

  } catch (error) {
    console.log(error);
    return res.status(400).json('error occured');
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { postId } = req.query;

    const comment = await Comment.findByIdAndDelete(id);

    if(comment){
      const result = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: {
            comments: comment._id,
          },
        }
      );
      return res.status(200).json(comment);
    }
    return res.status(400).json('error occured');
  } catch (error) {
    console.log(error);
    return res.status(400).json('error occured');
  }
});

module.exports = router;
