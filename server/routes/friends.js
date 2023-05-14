const Friends = require("./../models/friends");

const express = require("express");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await Friends.find({ userId: userId });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/follow/check", async (req, res) => {

  const {userId, userIdFriend} = req.query;

  try {
    const response = await Friends.find({
      userId: userId,
      following: userIdFriend,
    });
    if (response.length > 0) {
      return res.status(200).json({
        friend: "true",
      });
    }
      return res.status(200).json({
        friend: "false",
      });
    
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/follow", async (req, res) => {
  const { followingId, userId } = req.body;
  try {
    
    console.log(req.body)

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
    return res.status(400).json(error);
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
    return res.status(400).json(error);
  }
});

router.delete("/follow", async (req, res) => {
  const { userId, followingId } = req.query;
  try {

    const responsePull = await Friends.findOneAndUpdate(
      { userId: userId },
      { $pull: { following: followingId } }
    );

     res.status(200).json(responsePull);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
  try {
    const responsePullFollower = await Friends.findOneAndUpdate(
      { userId: followingId },
      { $pull: { followers: userId } }
    );
    return res.status(200).json(responsePullFollower);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
