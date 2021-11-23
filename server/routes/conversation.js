const User = require("../models/user");
const Conversation = require("../models/conversation");
const Messages = require("../models/messages");

const express = require("express");
const router = express.Router();

router.get("/getusersgroup", async (req, res) => {
  try {
    result = await User.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

router.post("/addconversation", async (req, res) => {
  const user1 = req.body.user1Id;
  const user2 = req.body.user2Id;
  try {
    const result = await Conversation.find({
      $or: [
        { user1: user1, user2: user2 },
        { user1: user2, user2: user1 },
      ],
    });
    if (result.length === 0) {
      const newConversation = new Conversation({
        user1: user1,
        user2: user2,
      });
      var response = await newConversation.save();
    } else {
      response = result[0];
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addmessage", async (req, res) => {
  const conversationId = req.body.conversationId;
  const senderId = req.body.senderId;
  const text = req.body.text;
  try {
    const newMessages = new Messages({
      conversationId: conversationId,
      senderId: senderId,
      text: text,
    });
    const response = await newMessages.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getconversation/:id", async (req, res) => {
  const conversationId = req.params.id;

  try {
    const response = await Messages.find({
      conversationId: conversationId,
    }).populate("senderId");

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
