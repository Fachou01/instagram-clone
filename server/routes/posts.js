const PostModel = require("../models/posts");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  result = await PostModel.find({}).populate("userId");
  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
