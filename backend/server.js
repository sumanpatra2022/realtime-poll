require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const pollRoutes = require("./routes/pollRoutes");

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = "https://realtime-poll-sand.vercel.app"; // your Vercel URL

// ✅ Express CORS
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// ✅ Socket.io CORS
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

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
