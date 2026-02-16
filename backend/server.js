require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const pollRoutes = require("./routes/pollRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/polls", pollRoutes(io));

io.on("connection", (socket) => {
  socket.on("joinPoll", (pollId) => {
    socket.join(pollId);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server running");
});
