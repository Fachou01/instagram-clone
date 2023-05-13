const Friends = require("./../models/friends");

const express = require("express");
const { response } = require("express");
const router = express.Router();

router.post("/addfollow", async (req, res) => {
  const followingId = req.body.followingId;
  const userId = req.body.userId;
  try {
    const responseUser = await Friends.find({ userId: userId }).populate("_id");

    if (responseUser.length === 0) {
      const newFriends = new Friends({
        userId: userId,
        following: followingId,
      });

      const response = await newFriends.save();
      //res.status(200).json(response);
    } else {
      const responseFollowingId = await Friends.find({
        userId: userId,
        following: followingId,
      });

      if (responseFollowingId.length === 0) {
        const responsePush = await Friends.findOneAndUpdate(
          { userId: userId },
          { $push: { following: followingId } }
        );
        //res.status(200).json(responsePush);
      }
    }
  } catch (error) {
    console.log(error);
  }
  //Add Followers
  try {
    const responseFollower = await Friends.find({
      userId: followingId,
    }).populate("_id");

    if (responseFollower.length === 0) {
      const newFriends = new Friends({
        userId: followingId,
        followers: userId,
      });

      const response = await newFriends.save();
      res.status(200).json(response);
    } else {
      const responseFollowerId = await Friends.find({
        userId: followingId,
        followers: userId,
      });

      if (responseFollowerId.length === 0) {
        const responsePushFollower = await Friends.findOneAndUpdate(
          { userId: followingId },
          { $push: { followers: userId } }
        );
        res.status(200).json(responsePushFollower);
      } else {
        res.status(200).json(responseFollowerId);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/deletefollow", async (req, res) => {
  const followingId = req.body.followingId;
  const userId = req.body.userId;

  try {
    const responsePull = await Friends.findOneAndUpdate(
      { userId: userId },
      { $pull: { following: followingId } }
    );

    return res.status(200).json(responsePull);
  } catch (error) {
    console.log(error);
    res.status(200).json(error);
  }
  try {
    const responsePullFollower = await Friends.findOneAndUpdate(
      { userId: followingId },
      { $pull: { followers: userId } }
    );
    res.status(200).json(responsePullFollower);
  } catch (error) {
    console.log(error);
    res.status(200).json(error);
  }
});

router.get("/myfriends/:userIdFriend&:userId", async (req, res) => {
  const userIdFriend = req.params.userIdFriend;
  const userId = req.params.userId;

  try {
    const response = await Friends.find({
      userId: userId,
      following: userIdFriend,
    });
    if (response.length > 0) {
      res.status(200).json({
        friend: "true",
      });
    } else {
      res.status(200).json({
        friend: "false",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json(error);
  }
});

router.get("/myfollows/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const response = await Friends.find({ userId: userId });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
