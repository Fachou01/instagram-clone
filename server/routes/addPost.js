const PostModel = require("../models/posts");

const express = require("express");
const router = express.Router();

router.post("/profile", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const newPosts = new PostModel({
    userId: id,
    title: title,
    image: image,
    description: description,
  });
  try {
    const response = await newPosts.save();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
