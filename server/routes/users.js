const User = require("../models/user");

const express = require("express");
const router = express.Router();

router.get("/userssearch", async (req, res) => {
  try {
    result = await User.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

module.exports = router;
