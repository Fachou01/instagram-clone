const User = require("../models/user");

const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.find({ email: email });
  try {
    const comparedPassword = bcrypt.compareSync(password, user[0].password);
    if (comparedPassword === true) {
      //create token
      const token = jwt.sign(
        { id: user[0]._id, email: user[0].email },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token);
      res.status(200).json({
        id: user[0]._id,
        token: token,
        fullName: user[0].fullName,
        userName: user[0].userName,
        picture: user[0].userPicture,
      });
    } else {
      res.status(201).json({
        message: "user found but password invalid !",
      });
    }
  } catch (error) {
    return res.status(201).json({
      message: "user not found !",
    });
  }
});

module.exports = router;
