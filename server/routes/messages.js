const Messages = require("../models/messages");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
      const { conversationId, senderId, text } = req.body;
      const newMessages = new Messages({
        conversationId: conversationId,
        senderId: senderId,
        text: text,
      });
      const response = await newMessages.save();
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  });

  module.exports = router;
