const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Routes
const addUser = require("./routes/addUser");
const addPost = require("./routes/addPost");
const myPosts = require("./routes/myPosts");
const getPosts = require("./routes/posts");
const likes = require("./routes/likes");
const login = require("./routes/login");
const conversation = require("./routes/conversation");
const comments = require("./routes/comments");
const friends = require("./routes/friends");
const UserSearsh = require("./routes/users");
//
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

app.use("/addpost", addPost);

app.use("/adduser", addUser);

app.use("/login", login);

app.use("/like", likes);

app.use("/getposts", getPosts);

app.use("/", myPosts);

app.use("/", comments);

app.use("/", conversation);

app.use("/", friends);

app.use("/", UserSearsh);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
