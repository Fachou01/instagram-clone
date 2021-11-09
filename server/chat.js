const express = require("express");
const cors = require("cors");
const server = require("http").createServer();

const app = express();
app.use(cors());
app.use(express.json());

server.listen("5000", () => {
  console.log("Server running on port 5000...");
});

var users = [
  {
    userId: "",
    socketId: "",
  },
];

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("registre", (data) => {
    const indexUser = users.findIndex((object) => {
      return object.userId === data;
    });
    if (indexUser === -1) {
      users.push({
        userId: data,
        socketId: socket.id,
      });
    } else {
      users[indexUser] = {
        userId: data,
        socketId: socket.id,
      };
    }
    console.log(users);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    var receiver = "";
    users.map((elt, index) => {
      if (elt.userId === data.receiverId) {
        receiver = elt.socketId;
        return receiver;
      }
    });
    console.log(receiver);
    socket.to(receiver).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
