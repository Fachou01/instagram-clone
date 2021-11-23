const bcrypt = require("bcryptjs");

const User = require("../models/user");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  const fullName = req.body.fullName;
  const userName = req.body.userName;
  const picture = req.body.picture;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 10);
  const userEmail = await User.findOne({ email: email });
  if (userEmail) {
    return res.status(201).json({
      message: "email already used",
    });
  }
  const userNameCheck = await User.findOne({ userName: userName });
  if (userNameCheck) {
    return res.status(201).json({
      message: "username already used",
    });
  }

  const newUser = new User({
    email: email,
    fullName: fullName,
    userName: userName,
    userPicture: picture,
    password: hashPassword,
  });
  try {
    const response = await newUser.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(error);
    console.log(err);
  }
});

module.exports = router;
