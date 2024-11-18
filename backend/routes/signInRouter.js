const express = require("express");
const router = express.Router();
const { clerkMiddleware, requireAuth } = require("@clerk/express");

const User = require("../models/user.js");
// router.use(requireAuth());

router.post("/user", async (req, res) => {
  try {
    const { newUser } = req.body;
    const { email, firstName, lastName, id } = newUser;
    let existingUser = await User.findOne({ email });
    console.log("existingUser", existingUser);
    if (!existingUser) {
      const newUser = new User({
        email,
        firstName: firstName,
        lastName,
        clerkId: id,
        googleId: id,
      });
      await newUser.save();
    }
    res.redirect("/dashboard"); // Redirect to your desired route after successful login
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to authenticate user" });
  }
});

module.exports = router;
