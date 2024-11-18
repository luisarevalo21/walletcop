const express = require("express");
const router = express.Router();
const Card = require("../models/cards.js");

router.get("/", async (req, res) => {
  try {
    const results = await Card.find({});
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch cards" });
  }
});



module.exports = router;
