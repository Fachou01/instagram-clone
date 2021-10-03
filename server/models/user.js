const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userPicture: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
