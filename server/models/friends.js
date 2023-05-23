const mongoose = require("mongoose");
const User = require("./user");

const FriendsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: User,
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: User,
  },
},
  {
    timestamps: true,
  }
);

const Friends = mongoose.model("friends", FriendsSchema);

module.exports = Friends;
