const mongoose = require("mongoose");
const User = require("./user");

const ConversationSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },

  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

const Conversation = mongoose.model("conversation", ConversationSchema);

module.exports = Conversation;
