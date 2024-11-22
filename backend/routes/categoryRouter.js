const express = require("express");
const router = express.Router();
const Category = require("../models/categories.js");

router.get("/", async (req, res) => {
  // console.log("req.auth", req.auth);
  // console.log("categorioes called");
  try {
    const results = await Category.find();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

module.exports = router;