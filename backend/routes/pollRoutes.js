const express = require("express");
const Poll = require("../models/Poll.js");
const Vote = require("../models/Vote");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

module.exports = (io) => {

  // Create Poll
  router.post("/", async (req, res) => {
    const { question, options } = req.body;

    if (!question || options.length < 2)
      return res.status(400).json({ error: "Invalid input" });

    const poll = await Poll.create({
      question,
      options: options.map(opt => ({ text: opt }))
    });

    res.json({ pollId: poll._id });
  });

  // Get Poll
  router.get("/:id", async (req, res) => {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: "Not found" });
    res.json(poll);
  });

  // Vote
  router.post("/:id/vote", limiter, async (req, res) => {
    const { optionIndex, voterId } = req.body;
    const ip = req.ip;

    const existingVote = await Vote.findOne({
      pollId: req.params.id,
      $or: [{ ipAddress: ip }, { voterId }]
    });

    if (existingVote)
      return res.status(400).json({ error: "Already voted" });

    await Vote.create({
      pollId: req.params.id,
      optionIndex,
      ipAddress: ip,
      voterId
    });

    const poll = await Poll.findById(req.params.id);
    poll.options[optionIndex].votes += 1;
    await poll.save();

    io.to(req.params.id).emit("pollUpdated", poll);

    res.json({ success: true });
  });

  return router;
};
