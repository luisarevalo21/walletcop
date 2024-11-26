const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
  imageUrl: {
    type: String,
  },
  wallet: [
    {
      creditCardId: { type: Schema.Types.ObjectId, ref: "Card" },
      addedAt: { type: Date, default: Date.now }, // Timestamp when the card was added
    },
  ],
  categories: [
    {
      categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
