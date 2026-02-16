const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" },
  optionIndex: Number,
  ipAddress: String,
  voterId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vote", voteSchema);
