const mongoose = require("mongoose");
const Conversation = require("./conversation");
const User = require("./user");

const MessagesSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Conversation,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  text: {
    type: String,
  },
});

const Messages = mongoose.model("messages", MessagesSchema);

module.exports = Messages;
