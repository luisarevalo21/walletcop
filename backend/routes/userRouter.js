const express = require("express");
const router = express.Router();
const User = require("../models/user");
router.post("/", async (req, res) => {
  const { email, userId, firstName, lastName, imageUrl } = req.body;
  const foundUser = await User.find({
    email: email,
  });

  if (foundUser) {
    console.log("user found");
    return res.status(200).json("okay");
  }

  const newUser = new User({
    email,
    lastName,
    firstName,
    userId,
    imageUrl,
  });
  await newUser.save().then(res => res.redirect("/dashboard"));

  // User.
});

module.exports = router;
