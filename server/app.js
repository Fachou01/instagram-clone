const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Routes
const login = require("./routes/login");
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const likes = require("./routes/likes");
const comments = require("./routes/comments");
const friends = require("./routes/friends");
const conversation = require("./routes/conversation");
const messages = require("./routes/messages.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

app.use("/login", login);
app.use("/users", users);
app.use("/posts", posts);
app.use("/likes", likes);
app.use("/comments", comments);
app.use("/friends", friends);
app.use("/conversation", conversation);
app.use("/messages", messages);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
