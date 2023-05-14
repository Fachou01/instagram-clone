const Conversation = require("../models/conversation");
const Messages = require("../models/messages");

const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id: conversationId } = req.params;

    const response = await Messages.find({
      conversationId: conversationId,
    }).populate("senderId");

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { user1Id: user1, user2Id: user2 } = req.body;
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
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
