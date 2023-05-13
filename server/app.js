const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Routes
// const addUser = require("./routes/addUser");
// const addPost = require("./routes/addPost");
// const myPosts = require("./routes/myPosts");
const likes = require("./routes/likes");
const login = require("./routes/login");
const conversation = require("./routes/conversation");
const comments = require("./routes/comments");
const friends = require("./routes/friends");

/////////////////
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
//
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// app.use("/addpost", addPost);

app.use("/login", login);

app.use("/like", likes);

app.use("/", comments);

app.use("/", conversation);

app.use("/", friends);

// REF

app.use("/users", users);
app.use("/posts", posts);

// app.use("/friends");
// app.use("/auth");
// app.use("/comments");
// app.use("/conversation");
// app.use("/likes");
// app.use("/messages");

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
