const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const PostModel = require("./models/posts");
const User = require("./models/user");
const Likes = require("./models/likes");
const Comment = require("./models/comments");
const Conversation = require("./models/conversation");
const Messages = require("./models/messages");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config({ path: "./config/config.env" });
//const connectDB=require('./config/db')
//load config
//connectDB()
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

app.post("/profile/addpost", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const image = req.body.image;
  const description = req.body.description;
  const newPosts = new PostModel({
    userId: id,
    title: title,
    image: image,
    description: description,
  });
  try {
    const response = await newPosts.save();
    res.json(response);
  } catch (error) {
    //res.status(500).json(error);
    console.log(error);
  }
});

app.post("/adduser", async (req, res) => {
  const email = req.body.email;
  const fullName = req.body.fullName;
  const userName = req.body.userName;
  const picture = req.body.picture;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 10);
  const userEmail = await User.findOne({ email: email });
  if (userEmail) {
    return res.status(201).json({
      message: "email already used",
    });
  }
  const userNameCheck = await User.findOne({ userName: userName });
  if (userNameCheck) {
    return res.status(201).json({
      message: "username already used",
    });
  }

  const newUser = new User({
    email: email,
    fullName: fullName,
    userName: userName,
    userPicture: picture,
    password: hashPassword,
  });
  try {
    const response = await newUser.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(error);
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.find({ email: email });
  try {
    const comparedPassword = bcrypt.compareSync(password, user[0].password);
    if (comparedPassword === true) {
      //create token
      const token = jwt.sign(
        { id: user[0]._id, email: user[0].email },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token);
      res.status(200).json({
        id: user[0]._id,
        token: token,
        fullName: user[0].fullName,
        userName: user[0].userName,
        picture: user[0].userPicture,
      });
    } else {
      res.status(201).json({
        message: "user found but password invalid !",
      });
    }
  } catch (error) {
    return res.status(201).json({
      message: "user not found !",
    });
  }
});
app.post("/getlike", async (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  try {
    const response = await Likes.find({ userId: userId, postId: postId });
    if (response.length > 0) {
      res.status(200).json({
        message: "Likes found",
      });
    } else {
      res.status(200).json({
        message: "Likes not found",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(401).json({
      message: "error in db",
    });
  }
});
app.put("/addlike", async (req, res) => {
  const postId = req.body.id;
  const like = req.body.like;
  try {
    const newLike = await PostModel.updateOne(
      { _id: postId },
      {
        $inc: {
          likes: +1,
        },
      }
    );
    res.json(newLike);
  } catch (err) {
    console.log("error");
  }
});
app.post("/addlike/likes", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  const newLike = new Likes({
    userId: userId,
    postId: postId,
  });
  try {
    const response = await newLike.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(error);
    console.log(err);
  }
});

app.put("/removelike", async (req, res) => {
  const postId = req.body.id;
  const like = req.body.like;
  try {
    const newLike = await PostModel.updateOne(
      { _id: postId },
      {
        $inc: {
          likes: -1,
        },
      }
    );
    res.json(newLike);
  } catch (err) {
    console.log("error");
  }
});

app.post("/removelike/likes", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  try {
    const response = await Likes.deleteOne({ userId: userId, postId: postId });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(error);
    console.log(err);
  }
});

app.get("/getposts", async (req, res) => {
  result = await PostModel.find({}).populate("userId");
  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3001, () => {
  console.log("listening to port 3001");
});

app.get("/myposts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    result = await PostModel.find({ userId: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.post("/addcomment", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const comment = req.body.comment;
  const newComment = new Comment({
    userId: userId,
    postId: postId,
    description: comment,
  });
  try {
    const response = await newComment.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(error);
    console.log(err);
  }
});

app.post("/getcomment", async (req, res) => {
  const postId = req.body.postId;

  try {
    result = await Comment.find({ postId: postId }).populate("userId");
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

app.post("/removecomment", async (req, res) => {
  const commId = req.body.commId;
  try {
    const response = await Comment.deleteOne({ _id: commId });
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

app.get("/profilepost/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    result = await Comment.find({ postId: postId }).populate("userId");
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});
app.get("/getusersgroup", async (req, res) => {
  try {
    result = await User.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
});

app.post("/addconversation", async (req, res) => {
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
      //console.log("not found");
      const newConversation = new Conversation({
        user1: user1,
        user2: user2,
      });
      var response = await newConversation.save();
    } else {
      response = result[0];
      //console.log(result);
      //console.log("Conversation exists !");
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post("/addmessage", async (req, res) => {
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

app.get("/getconversation/:id", async (req, res) => {
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
