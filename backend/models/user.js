const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
  clerkId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
