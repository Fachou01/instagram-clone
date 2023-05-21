const bcrypt = require("bcryptjs");
const User = require("../models/user");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

  try {
    const result = await User.find({});
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }

});

router.get("/:username", async (req, res) => {

  try {
    const { username } = req.params;
    const result = await User.findOne({userName:username});
    if(!result){
      return res.status(204).json('No user found');
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }

});

router.post("/", async (req, res) => {

  try {
    const { email, fullName, userName, picture, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(200).json({
        message: "email already used",
      });
    }
    const userNameCheck = await User.findOne({ userName: userName });

    if (userNameCheck) {
      return res.status(200).json({
        message: "username already used",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      fullName: fullName,
      userName: userName,
      userPicture: picture,
      password: hashedPassword,
    });

    const result = await newUser.save();
    return res.status(200).json(result);

  } catch (error) {
    console.log(error);
    return res.status(400).json(error);

  }
});

module.exports = router;
