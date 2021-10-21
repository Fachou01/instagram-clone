const express = require("express");
const cors = require("cors");
const server = require("http").createServer();

const app = express();
app.use(cors());
app.use(express.json());

server.listen("5000", () => {
  console.log("Server running on port 5000...");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join_chat", (room) => {
    socket.join(room);
  });
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
