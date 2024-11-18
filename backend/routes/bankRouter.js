const express = require("express");
const router = express.Router();

const Bank = require("../models/banks.js");

router.get("/", async (req, res) => {
  try {
    const results = await Bank.find();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch banks" });
  }
});
